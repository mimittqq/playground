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