import combineRouters from 'koa-combine-routers'

import demoRouter from './demoRouter'

export default combineRouters(
  demoRouter
)
