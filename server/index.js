/**
 * Created by wuding on 2017/5/27.
 */
const Koa = require('koa')
const convert = require('koa-convert')
const fs = require('fs')

// const loggerGenerator = require('./middleware/logger-generator')
const loggerAsync = require('./middleware/logger-async')
const app = new Koa()

// app.use(convert(loggerGenerator()))
app.use(convert(loggerAsync()))

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
// function render( page ) {
// 	return new Promise(( resolve, reject ) => {
// 		let viewUrl = `./view/${page}`
// 		fs.readFile(viewUrl, "binary", ( err, data ) => {
// 			if ( err ) {
// 				reject( err )
// 			} else {
// 				resolve( data )
// 			}
// 		})
// 	})
// }
//
// /**
//  * 根据URL获取HTML内容
//  * @param  {string} url koa2上下文的url，ctx.url
//  * @return {string}     获取HTML文件内容
//  */
// async function route( url ) {
// 	let view = '404.html'
// 	switch ( url ) {
// 		case '/':
// 			view = 'index.html'
// 			break
// 		case '/index':
// 			view = 'index.html'
// 			break
// 		case '/todo':
// 			view = 'todo.html'
// 			break
// 		case '/404':
// 			view = '404.html'
// 			break
// 		default:
// 			break
// 	}
// 	let html = await render( view )
// 	return html
// }
//
// app.use( async ( ctx ) => {
// 	let url = ctx.request.url
// 	let html = await route( url )
// 	ctx.body = html
// })

const Router = require('koa-router')
let home = new Router()

// home路由
home.get('/', async (ctx) => {
	let html = `
		<ul>
			<li><a href="/page/helloworld">/page/helloworld</a></li>
			<li><a href="/page/404">/page/404</a></li>
		</ul>
	`
	ctx.body = html
})

let page = new Router()
page.get('/404', async (ctx)=>{
	ctx.body = '404 page'
}).get('/helloworld', async (ctx)=>{
	let url = ctx.url
	// 从上下文的request对象中获取
	let request = ctx.request
	let req_query = request.query
	let req_querystring = request.querystring

	// 从上下文中直接获取
	let ctx_query = ctx.query
	let ctx_querystring = ctx.querystring

	ctx.body = {
		url,
		req_query,
		req_querystring,
		ctx_query,
		ctx_querystring
	}
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('starting at port 3000')