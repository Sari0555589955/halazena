"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.Brand = exports.Colors = exports.Sizes = exports.Roles = void 0;
exports.Roles = {
    ADMIN: "admin",
    SUPER_ADMIN: "super admin",
    SUB_ADMIN: "sub admin",
    USER: "user",
};
exports.Sizes = {
    XS: "xs",
    S: "s",
    M: "m",
    L: "l",
    XL: "xl",
};
exports.Colors = {
    RED: "red",
    OFF_WHITE: "off white",
    GREY: "grey",
    BLACK: "black",
    VIOLET: "violet",
    GREEN: "green",
};
exports.Brand = {
    ADDIDAS: "addidas",
    NIKE: "nike",
    PATH_BUDDY: "path buddy",
    TIMBERLAND: "timberland",
};
exports.OrderStatus = {
    PENDING: "pending",
    PROGRESS: "progress",
    DONE: "done",
    REJECTED: "rejected",
};
