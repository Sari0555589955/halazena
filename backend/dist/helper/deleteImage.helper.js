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
exports.deletingImages = exports.autoDeleteImages = exports.deleteImage = void 0;
const asyncHandler_1 = require("../middleWares/asyncHandler");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const product_model_1 = __importDefault(require("../model/product.model"));
const section_model_1 = __importDefault(require("../model/section.model"));
exports.deleteImage = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { image } = req.body;
    let photoPath = path_1.default.join(__dirname, '..', '..', 'uploads', image);
    const exist = fs_1.default.existsSync(photoPath);
    if (exist) {
        fs_1.default.unlink(photoPath, (err) => {
            if (err) {
                return res.status(400).send({ error_en: err.message });
            }
            else {
                return res.status(200).send({ success_en: 'Image deleted Successfully', image });
            }
        });
    }
}));
// ALL I NEED TO DO IS TO CHECK WITHER THE IMAGES IN THE UPLOADS FILE IS USED IN THE PRODUCT OR NOT 
// IF IT IS NOT DELETE IT OTHERWISE DO NOTHING
exports.autoDeleteImages = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // first gets array of all the images 
    let products = (yield product_model_1.default.find({})).map(product => product.images);
    let sections = (yield section_model_1.default.find({})).map(section => {
        if (section.image)
            return section.image;
    });
}));
const deletingImages = (req, res) => {
    const { images } = req.body;
    const basePath = path_1.default.join(__dirname, '..', '..', 'uploads');
    images.forEach((imgPath) => {
        let photoPath = basePath + imgPath;
        if (fs_1.default.existsSync(photoPath)) {
            // delete the image if exist 
            fs_1.default.unlink(photoPath, (err) => {
                if (err) {
                    return res.status(400).send({ error_en: err.message });
                }
                else {
                    return res.status(200).send({ success_en: 'Image deleted Successfully' });
                }
            });
        }
    });
};
exports.deletingImages = deletingImages;
