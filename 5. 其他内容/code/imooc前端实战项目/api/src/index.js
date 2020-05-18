import Koa from "koa";
import path from "path";
import cors from "@koa/cors";
import koaBody from "koa-body";
import helmet from "koa-helmet";
import statics from "koa-static";
import router from "./routes/routes";
import compose from "koa-compose";
import compress from "koa-compress";

const app = new Koa();

const isDevMode = process.env.NODE_ENV !== "production";

// 合并中间件
const middleware = compose([
  cors(),
  koaBody(),
  helmet(),
  statics(path.join(__dirname, "../public")),
  router()
]);

// 压缩代码
if (!isDevMode) {
  app.use(compress());
}

app.use(middleware);
app.use(router());

app.listen(3000);
