/**
 * 要点:
 * 返回 this, 方便链式调用
 * once 方法包裹传进来的 handler 并在调用后马上调用 this.off
 */
function EventEmitter() {
  type Linsteners = {
    [key:string]: Function[];
  }
  const listeners:Linsteners = {};
  return {
    on: (event_name:string, handler:Function) => {
      const arr = listeners[event_name] || [];
      arr.push(handler);
      listeners[event_name] = arr;
      return this;
    },
    once: (event_name:string, handler) => {
      const handled_handler = (...args) => {
        handler(...args);
        this.off(event_name, handled_handler);
      }
      this.on(event, handled_handler);
      return this;
    },
    emit: (event_name:string, ...args) => {
      const event_obj = listeners[event_name];
      if (!event_obj) {
        return;
      }
      event_obj.forEach((handler) => {
        handler(...args);
      })
      return this;
    },
    off: (event_name:string, handler) => {
      if (!listeners[event_name]) {
        return;
      }
      listeners[event_name] = listeners[event_name].filter(fn => fn !== handler);
      return this;
    }
  }
}

/**
 * 格式化数字。输入：12345，输出：12,234；输入：2345.6789，输出：2,345.6789。要求：使用正则和非正则两种方式实现
 */
// 正则表达式的前瞻后顾
function format_number_by_regexp(num) {
  return num.toString().replace(/(?<!\.\d*)\B(?=(\d{3})+(?!\d))/g, ',')
}
function format_number_by_normal(num) {
  let [int_num, float_num] = num.toString().split('.');
  let result = '';
  while (int_num.length > 3) {
    result = `,${int_num.slice(-3)}${result}`
    int_num = int_num.slice(0, -3)
  }
  return `${int_num || ''}${result}${float_num ? `.${float_num}` : ''}`
}

class Observer {
  obj;
  constructor(obj) {
    this.obj = obj;
    obj['__proto__'].$on = this.$on.bind(this);
    obj['__proto__'].$emit = this.$emit.bind(this);
    return obj;
  }
  $on(prop_name, handler) {
    if (this.obj[prop_name] === undefined) {
      return;
    }
    let value = this.obj[prop_name];
    Object.defineProperty(this.obj, prop_name, {
      get() {
        return value;
      },
      set(new_value) {
        handler(value, new_value);
        value = new_value;
      }
    });
  }
  $emit() {

  }
}

/**
 * 实现关键字 new 的效果, 即 new SomeClass(...args) = MyNew(SomeClass, ...args)
 * new 做了以下工作:
 * 1. 以构造器的 prototype 属性为原型, 创建新对象
 * 2. 将 this 和调用参数传给构造器, 执行
 * 3. 如果构造器返回的是对象, 则返回, 否则返回第一步创建的对象
 */
export function MyNew(someClass, ...args) {
  return function() {
    const result = {
      '__proto__': someClass.prototype,
    };
    const constructor_result = someClass.prototype.constructor.apply(result, args);
    if (typeof constructor_result === 'object') {
      return constructor_result;
    }
    return result;
  }
}

// 事件委托
function delegate(parent, selector, event_name, handle) {
  parent.addEventListener(event_name, (e) => {
    if (e.target === selector) {
      handle();
    }
  })
}

/**
 * 防抖: 多次触发事件后, 事件只在最后一次触发时执行, 可用于获取滚动条最后的位置
 * @param handler 
 * @param delay 
 */
function debounce(handler, delay) {
  let timer = undefined;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    this.timer = setTimeout(() => {
      handler(...args);
    }, delay);
  }
}

/**
 * 节流: 在某个时间内, 事件只会触发一次
 * @param handler 
 * @param delay 
 */
function throttle(handler, delay) {
  let last_time = undefined;
  let timer = undefined;
  return function(...args) {
    const current_time = Date.now();
    if (!last_time) {
      last_time = current_time;
    }
    const diff = current_time - last_time;
    if (timer) {
      clearTimeout(timer)
    }
    if (diff >= delay) {
      last_time = current_time;
      handler(...args);
    } else {
      setTimeout(() => {
        last_time = current_time;
        handler(...args);
      }, diff);
    }
  }
}

// bind, 把一个函数的上下文转到指定位置
// 示例 this.a = this.a.bind(this)
(Function.prototype as any).myBind = (context, ...args) => {
  if (!context) {
    throw new Error('Function bind requires context')
  }
  return (...otherArgs) => {
    return this.call(context, ...args, ...otherArgs);
  }
}

const single = (function() {
  let inst = undefined;
  const Constructor = () => {

  }
  const getInstance = () => {
    if (inst === undefined) {
      inst = new Constructor();
    }
    return inst
  }
  return {
    getInstance,
  }
})()

function is_obj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function get_empty_obj(obj) {
  return is_obj(obj) ? {} : Array.isArray(obj) ? [] : obj;
}

export function deepCloneDps(target:any) {
  const result = get_empty_obj(target);
  const stacks = [];
  // 用于处理环状, 即传入对象中 a 属性与 b 属性均指向同一对象的问题
  const map = new Map();

  // 如果不是数组/对象, 即不需要递归遍历, 直接返回原对象
  if (result === target) {
    return target;
  }

  stacks.push([target, result]);
  // target 做键值, 因为我们不会改变 target
  map.set(target, result);

  while (stacks.length) {
    const [tar, res] = stacks.pop();
    
    for (let key in tar) {
      if (tar.hasOwnProperty(key)) {
        // 之前已经处理过了 直接赋值即可
        if (map.get(tar[key])) {
          res[key] =  map.get(tar[key]);
          continue;
        }
        res[key] = get_empty_obj(tar[key]);
        if (res[key] !== tar[key]) {
          stacks.push([tar[key], res[key]]);
          map.set(tar[key], res[key]);
        }
      }
    }
  }
  return result;
}

// 两数组交集
export function intersect(arr1, arr2) {
  const result = [];
  const map1 = new Map();
  arr1.forEach((item) => {
    map1.set(item, (map1.get(item) || 0) + 1);
  });
  arr2.forEach((item) => {
    if (map1.has(item)) {
      result.push(item);
      const map1_next_value = map1.get(item) - 1;
      if (map1_next_value !== 0) {
        map1.set(item, map1_next_value);
      } else {
        map1.delete(item);
      }
    }
  });
  return result;
}