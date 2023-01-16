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
exports.DetailMyClasseController = void 0;
const DetailMyClasseService_1 = require("../../services/mycourse/DetailMyClasseService");
class DetailMyClasseController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const myclasse_id = req.query.myclasse_id;
            const detailMyClasseService = new DetailMyClasseService_1.DetailMyClasseService();
            const myclasse = yield detailMyClasseService.execute({
                myclasse_id
            });
            return res.json(myclasse);
        });
    }
}
exports.DetailMyClasseController = DetailMyClasseController;
