/**
 * Created by wuding on 2017/5/27.
 */
const Koa = require('koa')
const app = new Koa()

app.use(( ctx )=>{
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('starting at port 3000')