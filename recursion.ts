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