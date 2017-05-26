/**
 * Created by wuding on 2017/5/27.
 */
function log(ctx) {
  console.log('logger async: ')
  console.log(ctx.method, ctx.header.host + ctx.url)
}

module.exports = function () {
  return async function (ctx, next) {
    log(ctx)
    await next()
  }
}