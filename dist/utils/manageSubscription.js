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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSubscription = void 0;
const stripe_1 = require("./stripe");
const index_1 = __importDefault(require("../prisma/index"));
function saveSubscription(subscriptionId, customerId, createAction = false, deleteAction = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const findUser = yield index_1.default.user.findFirst({
            where: {
                stripe_customer_id: customerId,
            }
        });
        const subscription = yield stripe_1.stripe.subscriptions.retrieve(subscriptionId);
        const subscriptionData = {
            id: subscription.id,
            userId: findUser.id,
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
        };
        if (createAction) {
            console.log(subscriptionData);
            try {
                yield index_1.default.subscription.create({
                    data: subscriptionData
                });
            }
            catch (err) {
                console.log("ERRO CREATE");
                console.log(err);
            }
        }
        else {
            // Se nao estiver criando apenas atualizamos as informaçoes
            if (deleteAction) {
                yield index_1.default.subscription.delete({
                    where: {
                        id: subscriptionId,
                    }
                });
                return;
            }
            try {
                yield index_1.default.subscription.update({
                    where: {
                        id: subscriptionId
                    },
                    data: {
                        status: subscription.status,
                        priceId: subscription.items.data[0].price.id,
                    }
                });
            }
            catch (err) {
                console.log("ERRO UPDATE HOOK");
                console.log(err);
            }
        }
    });
}
exports.saveSubscription = saveSubscription;
