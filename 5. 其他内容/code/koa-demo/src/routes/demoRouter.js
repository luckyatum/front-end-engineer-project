import Router from 'koa-router'
import demoController from '../api/demoController'

const router = new Router()

router.get('/demo', demoController.demo)

export default router
