/**
 * Created by wuding on 2017/5/27.
 */
const Koa = require('koa')
const fs = require('fs')

// koa2使用generator中间件时需要
// const convert = require('koa-convert')
// const loggerGenerator = require('./middleware/logger-generator')
const loggerAsync = require('./middleware/logger-async')
const app = new Koa()

// koa2用generator中间件需要用koa-convert转换下，async的不需要
// app.use(convert(loggerGenerator()))
app.use(loggerAsync())


/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */

async function route(url) {
  let view = '404.html'
  switch (url) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }
  let html = await render(view)
  return html

}


app.use(async (ctx) => {
  let url = ctx.request.url
  let html = await route(url)
  ctx.body = html
})

app.listen(3000)
console.log('starting at port 3000')