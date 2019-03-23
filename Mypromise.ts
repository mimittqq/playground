enum PromiseStatus {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

const isFunction = variable => typeof variable === 'function';

class MyPromise {
  private _status:PromiseStatus;
  private _value;
  private _fullfilledQueue:Function[];
  private _rejectedQueue:Function[];
  constructor(handler) {
    if (!isFunction(handler)) {
      throw new TypeError('MyPromise resolver undefined is not a function');
    }
    this._status = PromiseStatus.PENDING;
    this._value = undefined;
    // 因为 promise 可以被调用多次, 所以需要一个队列保存对应调用
    this._fullfilledQueue = [];
    this._rejectedQueue = [];

    try {
      handler(this._resolve.bind(this), this._reject.bind(this));
    } catch(e) {
      this._reject(e);
    }
  }
  _resolve(value) {
    const fn = () => {
      if (this._status !== PromiseStatus.PENDING) {
        return;
      }
      const fulfilled = (val) => {
        this._status = PromiseStatus.FULFILLED;
        this._value = val;
        let cb = undefined;
        while (cb = this._fullfilledQueue.shift()) {
          cb(val);
        }
      }
      const rejected = (err:any) => {
        this._status = PromiseStatus.REJECTED;
        this._value = err;
        let cb = undefined;
        while (cb = this._rejectedQueue.shift()) {
          cb(err);
        }
      }
      // 当 value 为 promise 时, 当前 status 需等待 value 改变后才发生改变
      if (value instanceof MyPromise) {
        value.then((val) => {
          fulfilled(val);
        }, (err) => {
          rejected(err);
        })
      } else {
        fulfilled(value);
      }
    }
    setTimeout(fn, 0);
  }
  _reject(err:any) {
    const fn = () => {
      if (this._status !== PromiseStatus.PENDING) {
        return;
      }
      this._status = PromiseStatus.REJECTED;
      this._value = err;
      let cb = undefined;
      while (cb = this._rejectedQueue.shift()) {
        cb(err);
      }
    }
    setTimeout(fn, 0);
  }
  then(onFulfilled, onRejected?) {
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      const { _status, _value } = this;
      let fulfilled = (value) => {
        try {
          // 如果当前 onFulfilled 不是一个函数, 直接把 value 传递到下一次的 Promise
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            const res = onFulfilled(value);
            // 如果当前 onFulfilled 返回一个 promise, 需要等到这个 promise 状态发生改变才调用自身
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res);
            }
          }
        } catch(e) {
          onRejectedNext(e);
        }
      }
      let rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            const res = onRejected(error);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onRejectedNext(res);
            }
          }
        } catch(e) {
          onRejectedNext(e);
        } 
      }
      switch (_status) {
        case PromiseStatus.PENDING:
          this._fullfilledQueue.push(fulfilled);
          this._rejectedQueue.push(rejected);
          break;
        case PromiseStatus.FULFILLED:
          fulfilled(_value);
          break;
        case PromiseStatus.REJECTED:
          rejected(_value);
          break;
      }
    });
  }
  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (reason) => MyPromise.reject(cb()).then(() => reason),
    );
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new Promise((resolve) => resolve(value));
  }
  static reject(error) {
    return new Promise((resolve, reject) => reject(error));
  }
  static all(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError('object is not iterable (cannot read property Symbol(Symbol.iterator))');
    }
    return new MyPromise((resolve, reject) => {
      const values = [];
      for (const [index, promise] of promises.entries()) {
        // 数组参数可能不是 promise 需要先转成 promise
        this.resolve(promise).then((res) => {
          values[index] = res;
          if (values.length === promises.length) {
            resolve(values);
          }
        }, (err) => {
          reject(err);
        });
      }
    })
  }
  static race(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError('object is not iterable (cannot read property Symbol(Symbol.iterator))');
    }
    return new MyPromise((resolve, reject) => {
      for (const promise of promises) {
        // 数组参数可能不是 promise 需要先转成 promise
        this.resolve(promise).then((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      }
    });
  }
}