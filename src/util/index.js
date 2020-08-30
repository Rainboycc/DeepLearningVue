/**
 * 当前数据是不是对象
 * @param {*} obj 
 */
export function isObject(obj) {
  return  obj !== null && typeof obj === 'object'
}

/**
 * 定义不可枚举属性
 * @param {*} data 
 * @param {*} key 
 * @param {*} value 
 */
export function def (data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false, 
    configurable: false,
    value
  })
}