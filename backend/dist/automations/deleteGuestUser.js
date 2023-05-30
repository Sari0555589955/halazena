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
exports.deleteGuest = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const setLocation_1 = require("../middleWares/setLocation");
const deleteGuest = () => {
    node_cron_1.default.schedule('* * */1 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        // delete all the user with empty email as guest
        // but first delete the cart form them
        (0, setLocation_1.deleteGustes)();
    }));
};
exports.deleteGuest = deleteGuest;
