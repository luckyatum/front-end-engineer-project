import svgCaptcha from "svg-captcha";

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({});
    ctx.body = {
      msg: newCaptcha.data
    };
  }
}

export default new PublicController();
