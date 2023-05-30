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
exports.deleteGustes = exports.setLocation = void 0;
const cart_model_1 = __importDefault(require("../model/cart.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
// import Location from "../model/location.model";
const setLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
});
exports.setLocation = setLocation;
const deleteGustes = () => __awaiter(void 0, void 0, void 0, function* () {
    const dateAfterOneHour = new Date(new Date().setHours(new Date(Date.now()).getHours() - 1, new Date(Date.now()).getMinutes()));
    let users = (yield user_model_1.default.find({
        email: '', createdAt: {
            $lte: dateAfterOneHour,
        }
    })).map(user => (user._id));
    yield cart_model_1.default.deleteMany({ user: users });
    yield user_model_1.default.deleteMany({ _id: users });
});
exports.deleteGustes = deleteGustes;
