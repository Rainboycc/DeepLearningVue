import { initState } from './state'
import { compileToFunction } from './compiler/index'
// 在原型上添加init方法
export function initMixin (Vue) {
  // 初始化流程
  Vue.prototype._init = function (params) {

    // 数据劫持
    const vm = this; // Vue中使用this.$options 指代的就是用户传递的属性
    vm.$options = params;

    // 初始化状态 
    initState(vm);

    // 如果用户传入了el属性 需要将页面渲染出来
    // 实现挂载流程
    vm.$mount(vm.$options.el);

  }
  Vue.prototype.$mount = function (el) {

    if (!vm.$options.el) return ;

    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    // 默认先会查找有没有render方法，没有render会采用template，template也没有就用el中的内容
    if (!options.render) {
      // 对模板进行编译
      let template = options.template; //取出模板
      if (!template && el) {
        template = el.outerHTML;
      }
      // 将template转换成render方法 vue1.0用字符串正则表达式替换  vue2.0引入虚拟DOM
      const render  = compileToFunction(template);
      options.render = render;
    }

  }
}