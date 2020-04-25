import combineRouters from "koa-combine-routers";

import publicRouter from "./publicRouter";

export default combineRouters(publicRouter);
