import svgCaptcha from "svg-captcha";

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: 'Oo0li1',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 50
    });
    ctx.body = {
      code: 200,
      msg: newCaptcha.data
    };
  }
}

export default new PublicController();
