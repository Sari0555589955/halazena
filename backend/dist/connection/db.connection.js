"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DBConnection = () => {
    mongoose_1.default
        .connect(process.env.MONGO_URL)
        .then((value) => { })
        .catch((e) => {
        console.log(`Error: ${e.message}`.red);
    });
    mongoose_1.default.set("strictQuery", true);
};
exports.DBConnection = DBConnection;
