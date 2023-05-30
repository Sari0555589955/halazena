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
exports.deleteImages = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const path_1 = __importDefault(require("path"));
const product_model_1 = __importDefault(require("../model/product.model"));
const section_model_1 = __importDefault(require("../model/section.model"));
const fs_1 = __importDefault(require("fs"));
// LETS DIVIDE THE CODE TO FUNCTIONS 
const getAllTheImages = () => __awaiter(void 0, void 0, void 0, function* () {
    let images = [];
    let products = (yield product_model_1.default.find({})).map(product => product.images);
    let sections = (yield section_model_1.default.find({ $ne: { image: '' } })).map(section => section.image);
    // fltenout the nested array
    products.map(product => {
        images = [...images, ...product];
    });
    if (sections[0]) {
        images = [...images, ...sections];
    }
    return images;
});
const convertArrayToObject = (images) => {
    let imagesObj = {};
    images.forEach(image => {
        if (!imagesObj[image]) {
            imagesObj[image] = true;
        }
    });
    return imagesObj;
};
const delteImageFromUpload = (imagePath) => {
    const exist = fs_1.default.existsSync(imagePath);
    if (fs_1.default.existsSync(imagePath)) {
        fs_1.default.unlinkSync(imagePath);
    }
};
const deleteUnUsedImages = (images) => {
    const uploadsPath = path_1.default.join(__dirname, '..', '..', 'uploads');
    const assets = fs_1.default.readdirSync(uploadsPath);
    let imagesObject = convertArrayToObject(images);
    // convert the usedImages to object
    assets.forEach((asset) => {
        let assetPath = `${uploadsPath}/${asset}`;
        if (!imagesObject[asset]) {
            // its time for image to get Delted
            delteImageFromUpload(assetPath);
        }
    });
};
const deleteImages = () => {
    const start = new Date();
    node_cron_1.default.schedule('* * */24 * * *', (() => __awaiter(void 0, void 0, void 0, function* () {
        let images = yield getAllTheImages();
        deleteUnUsedImages(images);
        // lets get all the uploads 
        // the main event for deleting the assets if it not exist in the upload
    })));
};
exports.deleteImages = deleteImages;
