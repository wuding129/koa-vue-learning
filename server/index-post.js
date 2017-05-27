/**
 * Created by chuck on 2017/5/27.
 */

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx)=>{
	if (ctx.url === '/' && ctx.method === 'GET') {
		// 当get请求是返回
		let html =
			`
				<h1>koa2 post demo</h1>
				<form action="/" method="post">
					<p>userName</p>
					<input type="text" name="userName">
					<p>nickName</p>
					<input type="text" name="nickName">
					<p>email</p>
					<input type="text" name="email">
					<button type="submit">submit</button>
				</form>
			`
		ctx.body = html

	} else if (ctx.url === '/' && ctx.method === 'POST') {
		// 当post请求时解析post表单数据
		let postData = await parsePostData(ctx)
		ctx.body = postData
	} else {
		ctx.body = '<h1>404!!!</h1>'
	}
})

function parsePostData(ctx) {
	return new Promise((resolve, reject)=>{
		try {
			let postdata = ""
			ctx.req.addListener('data', (data)=>{
				postdata += data
			})
			ctx.req.addListener('end', ()=>{
				let parseData = parseQueryStr(postdata)
				resolve(parseData)
			})
		} catch (err) {
			reject(err)
		}
	})
}

function parseQueryStr(queryStr) {
	let queryData = {}
	let queryStrList = queryStr.split('&')
	console.log(queryStrList)
	for(let [index, queryStr] of queryStrList.entries()){
		let itemList = queryStr.split('=')
		queryData[itemList[0]] = decodeURIComponent(itemList[1])
	}
	return queryData
}

app.listen(3000)
console.log('port 3000')