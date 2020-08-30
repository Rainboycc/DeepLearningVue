import { initMixin } from './init';

// Vue 核心代码 只是Vue的声明
function Vue(options){

  // 进行Vue的初始化操作
  this._init(options);

}
// 通过引入文件的方式，给Vue原型添加上方法
initMixin(Vue);

export default Vue
