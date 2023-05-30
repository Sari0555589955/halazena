"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingHelper = void 0;
const ratingHelper = (arr) => {
    let avg = 0;
    arr.forEach((ele) => {
        avg += ele;
    });
    return (avg / arr.length);
};
exports.ratingHelper = ratingHelper;
// ratingHelper([5,5,5,5,5,5,5,5,5,5,5])
