"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const CreateMyClasseController_1 = require("./controllers/mycourse/CreateMyClasseController");
const ListMyClasseController_1 = require("./controllers/mycourse/ListMyClasseController");
const DetailMyClasseController_1 = require("./controllers/mycourse/DetailMyClasseController");
const FindClasseController_1 = require("./controllers/mycourse/FindClasseController");
const CreateClasseController_1 = require("./controllers/classe/CreateClasseController");
const ListByMyClasseController_1 = require("./controllers/classe/ListByMyClasseController");
const SubscribeController_1 = require("./controllers/subscription/SubscribeController");
const WebhooksController_1 = require("./controllers/subscription/WebhooksController");
const CreatePortalController_1 = require("./controllers/subscription/CreatePortalController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.put('/users/update', new UpdateUserController_1.UpdateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
router.post('/myclasses', isAuthenticated_1.isAuthenticated, upload.fields([{ name: 'teacherphoto', maxCount: 1 }, { name: 'image', maxCount: 1 }]), new CreateMyClasseController_1.CreateMyClasseController().handle);
router.get('/myclasses', isAuthenticated_1.isAuthenticated, new ListMyClasseController_1.ListMyClasseController().handle);
router.get('/myclasses/details', isAuthenticated_1.isAuthenticated, new DetailMyClasseController_1.DetailMyClasseController().handle);
router.get('/myclasses/search', isAuthenticated_1.isAuthenticated, new FindClasseController_1.FindClasseController().handle);
router.post('/classes', isAuthenticated_1.isAuthenticated, upload.single('material'), new CreateClasseController_1.CreateClasseController().handle);
router.get('/myclasses/classes', isAuthenticated_1.isAuthenticated, new ListByMyClasseController_1.ListByMyClasseController().handle);
router.post('/subscribe/yearly', isAuthenticated_1.isAuthenticated, new SubscribeController_1.SubscribeAnualController().handle);
router.post('/subscribe/monthly', isAuthenticated_1.isAuthenticated, new SubscribeController_1.SubscribeMensalController().handle);
router.post('/webhooks', express_1.default.raw({ type: 'application/json' }), new WebhooksController_1.WebhooksController().handle);
router.post('/create-portal', isAuthenticated_1.isAuthenticated, new CreatePortalController_1.CreatePortalController().handle);
