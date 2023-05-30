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
exports.createGuestUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
// const generateRandomUserId = async () => {
//     const users = await User.find({})
//     let state = true;
//     let _id: string;
//     do {
//         _id = uuidv4().replace(/\-/g, "")
//         users.forEach((user) => {
//             if (user._id.toString() !== _id) {
//                 state = false
//             }
//         })
//     } while (state)
//     // GENERATED ID IS READY TO BE INJECTED TO THE USERS
//     return _id;
// }
const createGuestUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let _id = await generateRandomUserId();
    console.log('befor Error; a;jdfoaodfapdfadjofjf');
    const user = new user_model_1.default();
    yield user.save();
    // GENERATE TOKEN OF THAT USER AND RETURN IT TO THE FRONT SIDE
    console.log('user GetBack: ', user);
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    if (token) {
        return res.status(200).send({ success_en: "Token For Guest User", token });
    }
    res.status(400).send({ error_en: "Cant Send Token To Guest user" });
});
exports.createGuestUser = createGuestUser;
