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
exports.CreateClasseController = void 0;
const CreateClasseService_1 = require("../../services/classe/CreateClasseService");
class CreateClasseController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, myclasse_id, link } = req.body;
            const createMyClasseService = new CreateClasseService_1.CreateClasseService();
            if (!req.file) {
                throw new Error("error upload file");
            }
            else {
                const { filename: material } = req.file;
                const classe = yield createMyClasseService.execute({
                    material,
                    description,
                    myclasse_id,
                    title,
                    link,
                });
                return res.json(classe);
            }
        });
    }
}
exports.CreateClasseController = CreateClasseController;
