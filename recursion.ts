/**
 * 写一些递归函数练习
 */

export function deepClone(object:any) {
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  function iterator(target) {
    if (typeof target !== 'object') {
      return target
    } else {
      const result = Array.isArray(target) ? [] : {}
      for (let i in target) {
        if (target.hasOwnProperty(i)) {
          result[i] = iterator(target[i]);
        }
      }
      return result
    }
  }
  return iterator(object);
}

export function falt<T>(target:(T | T[])[]) : T[] {
  const result = [];
  function iterator(arr:(T | T[])[]) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (Array.isArray(item)) {
        iterator(item)
      } else {
        result.push(item);
      }
    }
  }
  iterator(target)
  return result;
}

export function co<T>(genarator) {
  const iterator:IterableIterator<T> = genarator();
  function run(iteration:IteratorResult<T>) {
    if (iteration.done) {
      return iteration.value
    }
    run(iterator.next(iteration.value))
  }
  run(iterator.next());
}