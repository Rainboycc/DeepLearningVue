// 重写数组的方法 push shift unshift pop reverse sort splice 会导致数组本身发生变化
// slice 截取方法不会改变数组本身 不需要劫持
const methods = [ 'push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice' ]
const oldArrayMethods = Array.prototype;
// 原型链查找，保证原有数组操作不被覆盖
// value.__proto__ = arrayMethods
// arrayMethods.__proto__ = oldArrayMethods
export const arrayMethods = Object.create(oldArrayMethods);
methods.forEach(method => {
  // 装饰模式 劫持数组方法 AOP切片编程
  arrayMethods[method] = function (...args) {
    // 调用数组原有的方法
    const result = oldArrayMethods[method].apply(this, args);
    // push unshift 添加的元素可能还是个对象 需要继续观察
    let inserted; // 当前用户插入的对象
    let ob = this.__ob__;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice': // 3个参数 新增属性 splice 有删除 修改 新增的功能  
        inserted = args.slice(2)
      default: 
        break;
    }
    // 将新增属性继续观察
    if (inserted) ob.observerArray(inserted);
    return result;
  }
})