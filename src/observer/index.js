import { isObject, def } from '../util/index'
import { arrayMethods } from './array.js'
class Observer {
  constructor (value) {
    // vue如果数据的层次过多，需要递归地解析对象中的属性，依次增加set和get方法 
    // vue3使用proxy 不需要递归, 不需要依次增加set和get 性能更高
    // 给每个被观察的对象添加一个观察者属性
    // value.__ob__ = this; 导致无限递归观察问题
    def(value, '__ob__', this); // 定义不可被枚举属性 避免遍历观察对象属性时被观察 导致无限递归观察问题
    if (Array.isArray(value)) {
      // 如果是数组的话不需要对索引进行观察 因为会导致性能问题
      // 前端开发中尽量不要使用 索引去操作 push shift unshift
      // 重写数组方法 实现观察数组 
      // 函数劫持(装饰模式)
      value.__proto__ = arrayMethods;
      // 如果数组里面放的是对象再观察对象
      this.observerArray(value);
    } else {
      // 对象观察
      this.walk(value);
    }
  }
  observerArray (array) {
    // 遍历数组 对数组里的对象进行观察
    array.forEach(item => {
      observe(item)
    })
  }
  walk (data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]); // 定义响应式数据
    })
  }
}

function defineReactive (data, key, value) {
  // 递归深度观察对象
  observe(value);
  Object.defineProperty(data, key, {
    get () { // 获取值的时候进行操作
      return value;
    },
    set (newValue) { // 设置值的时候进行操作
      if (newValue === value) return;
      observe(newValue); // 继续劫持用户设置的值, 因为用户有可能设置的值是一个对象
      value = newValue;
    }
  })
}

// 把data中的数据使用Object.defineProperty重新定义
// Object.defineProperty 不能兼容ie8及以下 vue2无法兼容ie8版本
export function observe(data) {
  if (!isObject(data)) return;
  return new Observer(data); // 观测数据
}