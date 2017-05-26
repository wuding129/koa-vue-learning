/**
 * Created by wuding on 2017/5/27.
 */
function log(ctx) {
  console.log('logger generator: ')
  console.log(ctx.method, ctx.header.host + ctx.url)
}

module.exports = function () {
  return function *(next) {

    // 执行中间件操作
    log(this)

    if (next) {
      yield next
    }
  }
}