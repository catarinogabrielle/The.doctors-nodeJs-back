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
exports.CreateMyClasseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateMyClasseService {
    execute({ title, link, image, teacherphoto, teachername, teacherinfo, teacherwork, description, time }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificar se ele colocou um titulo
            if (title === '') {
                throw new Error("Title invalid");
            }
            const myclasse = yield prisma_1.default.myclasse.create({
                data: {
                    title: title,
                    image: image,
                    teachername: teachername,
                    teacherphoto: teacherphoto,
                    teacherwork: teacherwork,
                    teacherinfo: teacherinfo,
                    description: description,
                    time: time,
                    link: link,
                },
                select: {
                    title: true,
                    image: true,
                    teachername: true,
                    teacherphoto: true,
                    teacherwork: true,
                    teacherinfo: true,
                    description: true,
                    time: true,
                    link: true
                }
            });
            return myclasse;
        });
    }
}
exports.CreateMyClasseService = CreateMyClasseService;
