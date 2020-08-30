import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/index.js', // 入口
  output: {
    file: 'dist/umd/vue.js', // 出口路径
    name: 'Vue', // 指定打包后全局变量的名字
    format: 'umd', // 统一模块规范
    sourcemap: true // es6 -> es5 开启源码调试  可以找到源代码的报错位置
  },
  plugins: [
    babel({
      // 转换js代码es6->es5  排除掉node_modules下的js代码
      exclude: "node_modules/**"
    }),
    // 当前环境是否为开发环境
    process.env.ENV === 'development' ? 
    serve({
      open: true, // 是否自动打开页面
      openPage: "/public/index.html", // 默认打开html的路径
      port: 3000, // 开启服务端口号
      contentBase: '' // 当前基础路径
    }):null
  ]
}