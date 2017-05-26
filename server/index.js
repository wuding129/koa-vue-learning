/**
 * Created by wuding on 2017/5/27.
 */
const Koa = require('koa')
const convert = require('koa-convert')
const loggerGenerator = require('./middleware/logger-generator')
const loggerAsync = require('./middleware/logger-async')
const app = new Koa()

app.use(convert(loggerGenerator()))
app.use(convert(loggerAsync()))

app.use(( ctx )=>{

  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('starting at port 3000')