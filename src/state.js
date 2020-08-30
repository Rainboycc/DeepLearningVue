import { observe } from './observer/index'
// 初始化状态
export function initState(vm) {
  // vue的数据来源 属性props 方法methods 数据data 计算属性computed 观察者watch
  initProps(vm);
  initMethods(vm);
  initData(vm);
  initComputed(vm);
  initWatch();
}

function initProps(vm) {}
function initMethods(vm) {}
function initData(vm) {
  
  if (!vm.$options.data) return;

  let data = vm.$options.data;
  // 如果data是函数，则执行函数，注意this指向实例
  data = vm._data =  typeof data === 'function' ? data.call(vm) : data;
  // 对象劫持 用户改变数据 可以得到通知 => 页面刷新 (响应式原理)
  // MVVM模式 数据变化可以驱动视图变化
  // Object.defineProperty() 给属性增加get方法和set方法
  observe(data);
   
}
function initComputed() {}
function initWatch(vm) {}