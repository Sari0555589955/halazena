"use strict";
// here i'm gonna create report of the inventory reports 
// first lets get array of object in the .json file
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
exports.getHistoryInv = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xlsx_1 = __importDefault(require("xlsx"));
const inventory_model_1 = __importDefault(require("../model/inventory.model"));
// get all The history of the order records
// route : get /unStore/api/v1/inventory/getHistory/:invId
// function to convert from json to .xlsx
const convertFromJSONToXLSX = (json) => {
    const date = new Date();
    // i need a way of checking how many files are there 
    // create work sheet
    const workSheet = xlsx_1.default.utils.json_to_sheet(json);
    // create work book
    const workBook = xlsx_1.default.utils.book_new();
    // not lets combine both
    xlsx_1.default.utils.book_append_sheet(workBook, workSheet, 'reports');
    // now lets creating the buffer
    xlsx_1.default.write(workBook, { bookType: 'xlsx', type: 'buffer' });
    // now lets creating binary string 
    xlsx_1.default.write(workBook, { bookType: 'xlsx', type: 'binary' });
    // now lets download that file 
    xlsx_1.default.writeFile(workBook, `./uploads/${date.getSeconds()}_reports.xlsx`);
};
const getHistoryInv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inv = yield inventory_model_1.default.findById(req.params.invId);
    const records = inv === null || inv === void 0 ? void 0 : inv.reports;
    // store it in file
    const filePath = path_1.default.join(__dirname, '../../inv.json');
    fs_1.default.writeFileSync(filePath, JSON.stringify(records));
    convertFromJSONToXLSX(records);
});
exports.getHistoryInv = getHistoryInv;
//DESC: get the most selling products
// Route: /GET /unStore/api/v1/inventory/mostSelling
