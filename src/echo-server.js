const Koa        = require('koa')
const Router     = require('koa-router')
const BodyParser = require('koa-bodyparser')

class EchoServer {
  constructor (port = null, url = '/bdd/echo') {
    if (port === null) {
      port = 10000 + Math.ceil(Math.random() * 50000)
    }
    this.port   = port
    this.url    = url
    this.snap   = null
    this.app    = new Koa()
    this.router = new Router()

    this.router
      .post(this.url, (ctx, next) => {
        this.snap = ctx.request.body
        next()
      })
      .get(this.url, (ctx, next) => {
        ctx.body = JSON.stringify(this.snap)
        next()
      })

    this.app
      .use(BodyParser())
      .use(this.router.routes())
      .use(this.router.allowedMethods())
  }

  fullurl () {
    return `http://localhost:${this.port}${this.url}`
  }

  listen () {
    this.app.listen(this.port)
  }
}

module.exports = EchoServer
