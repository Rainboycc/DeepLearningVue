import { initState } from './state'

// 在原型上添加init方法
export function initMixin (Vue) {
  // 初始化流程
  Vue.prototype._init = function (params) {

    // 数据劫持
    const vm = this; // Vue中使用this.$options 指代的就是用户传递的属性
    vm.$options = params;

    // 初始化状态 
    initState(vm);
  }
}