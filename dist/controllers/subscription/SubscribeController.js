"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeMensalController = exports.SubscribeAnualController = void 0;
const SubscribeAnualService_1 = require("../../services/subscriptions/SubscribeAnualService");
const SubscribeMensalService_1 = require("../../services/subscriptions/SubscribeMensalService");
class SubscribeAnualController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = request.user_id;
            const subscribeService = new SubscribeAnualService_1.SubscribeAnualService();
            const subscribe = yield subscribeService.execute({
                user_id
            });
            return response.json(subscribe);
        });
    }
}
exports.SubscribeAnualController = SubscribeAnualController;
class SubscribeMensalController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = request.user_id;
            const subscribeService = new SubscribeMensalService_1.SubscribeMensalService();
            const subscribe = yield subscribeService.execute({
                user_id
            });
            return response.json(subscribe);
        });
    }
}
exports.SubscribeMensalController = SubscribeMensalController;
