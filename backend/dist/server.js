"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
require("colors");
const db_connection_1 = require("./connection/db.connection");
const user_router_1 = __importDefault(require("./routes/user.router"));
const category_router_1 = __importDefault(require("./routes/category.router"));
const product_router_1 = __importDefault(require("./routes/product.router"));
const inventory_router_1 = __importDefault(require("./routes/inventory.router"));
const cart_router_1 = __importDefault(require("./routes/cart.router"));
const savedProduct_1 = __importDefault(require("./routes/savedProduct"));
const order_router_1 = __importDefault(require("./routes/order.router"));
const section_router_1 = __importDefault(require("./routes/section.router"));
const contact_router_1 = __importDefault(require("./routes/contact.router"));
const joi_1 = __importDefault(require("joi"));
const upload_helper_1 = __importDefault(require("./helper/upload.helper"));
const cors_1 = __importDefault(require("cors"));
const setLocation_1 = require("./middleWares/setLocation");
const createGuestUser_1 = require("./helper/createGuestUser");
joi_1.default.objectId = require("joi-objectid")(joi_1.default);
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./config/dev.env") });
const app = (0, express_1.default)();
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./config/dev.env") });
// deleteGuest()
// deleteImages()
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// routes
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.use("/", setLocation_1.setLocation);
app.use("/unStore/api/v1/user", user_router_1.default);
app.use("/unStore/api/v1/category", category_router_1.default);
app.use("/unStore/api/v1/product", product_router_1.default);
// app.use('/unStore/api/v1/order', orderRoutes)
app.use("/unStore/api/v1/inventory", inventory_router_1.default);
app.use("/unStore/api/v1/cart", cart_router_1.default);
app.use("/unStore/api/v1/savedProduct", savedProduct_1.default);
app.use("/unStore/api/v1/order", order_router_1.default);
app.use("/unStore/api/v1/section", section_router_1.default);
app.use("/unStore/api/v1/contact", contact_router_1.default);
app.use("/unStore/api/v1/createGuestUser", createGuestUser_1.createGuestUser);
app.use("/unStore/api/v1/upload", upload_helper_1.default.single("image"), (req, res) => {
    var _a;
    //TODO
    // ADD THE LOGIC HERE TO SAVE ARRAY OF IMAGES
    res.send({ filename: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename });
});
app.use((error, req, res, next) => {
    if (error) {
        return res.status(400).send(error.message);
    }
});
app.use("**", (req, res) => {
    res.send("Unhandled Route");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    (0, db_connection_1.DBConnection)();
    console.log("connected Successfully on Port :", port);
});
