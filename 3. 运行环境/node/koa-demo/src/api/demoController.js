class DemoController {
  constructor () {}
  async demo (ctx) {
    ctx.body = {
      msg: 'body message123'
    }
  }
}

export default new DemoController()
