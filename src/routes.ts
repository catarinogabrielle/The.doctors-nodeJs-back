import express, { Router, Request, Response } from 'express'
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { UpdateUserController } from './controllers/user/UpdateUserController'

import { CreateMyClasseController } from './controllers/mycourse/CreateMyClasseController'
import { ListMyClasseController } from './controllers/mycourse/ListMyClasseController'
import { DetailMyClasseController } from './controllers/mycourse/DetailMyClasseController'
import { FindClasseController } from './controllers/mycourse/FindClasseController'

import { CreateClasseController } from './controllers/classe/CreateClasseController'
import { ListByMyClasseController } from './controllers/classe/ListByMyClasseController'

import { SubscribeAnualController, SubscribeMensalController } from './controllers/subscription/SubscribeController'
import { WebhooksController } from './controllers/subscription/WebhooksController'
import { CreatePortalController } from './controllers/subscription/CreatePortalController'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post('/users', new CreateUserController().handle)
router.put('/users/update', new UpdateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

router.post('/myclasses', isAuthenticated, upload.fields([{ name: 'teacherphoto', maxCount: 1 }, { name: 'image', maxCount: 1 }]), new CreateMyClasseController().handle)
router.get('/myclasses', isAuthenticated, new ListMyClasseController().handle)
router.get('/myclasses/details', isAuthenticated, new DetailMyClasseController().handle)
router.get('/myclasses/search', isAuthenticated, new FindClasseController().handle)

router.post('/classes', isAuthenticated, upload.single('material'), new CreateClasseController().handle)
router.get('/myclasses/classes', isAuthenticated, new ListByMyClasseController().handle)

router.post('/subscribe/yearly', isAuthenticated, new SubscribeAnualController().handle)
router.post('/subscribe/monthly', isAuthenticated, new SubscribeMensalController().handle)
router.post('/webhooks', express.raw({ type: 'application/json' }), new WebhooksController().handle)
router.post('/create-portal', isAuthenticated, new CreatePortalController().handle)

export { router };