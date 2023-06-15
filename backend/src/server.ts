import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import "colors";
import { DBConnection } from "./connection/db.connection";
import userRoutes from "./routes/user.router";
import categoryRoutes from "./routes/category.router";
import productRoutes from "./routes/product.router";
import invRoutes from "./routes/inventory.router";
import cartRoutes from "./routes/cart.router";
import savedProductRoutes from "./routes/savedProduct";
import OrderRoutes from "./routes/order.router";
import SectionRoutes from "./routes/section.router";
import ContactRoutes from "./routes/contact.router";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import upload from "./helper/upload.helper";
import { AuthenticatedRequest } from "./middleWares/authentication.middleWare";
import cors from "cors";
import { setLocation } from "./middleWares/setLocation";
import { createGuestUser } from "./helper/createGuestUser";
import https from "https";
import fs from "fs";
Joi.objectId = require("joi-objectid")(Joi);
dotenv.config({ path: path.join(__dirname, "./config/dev.env") });
const app = express();
// const options = {
//   key: fs.readFileSync(
//     path.join(
//       __dirname,
//       `../../../../etc/letsencrypt/live/saritest.store/privkey.pem`
//     )
//   ),
//   cert: fs.readFileSync(
//     path.join(
//       __dirname,
//       `../../../../etc/letsencrypt/live/saritest.store/fullchain.pem`
//     )
//   ),
// };
// const ser = https.createServer(options, app);
import { deleteGuest } from "./automations/deleteGuestUser";
import { deleteImages } from "./automations/deleteImages";
dotenv.config({ path: path.join(__dirname, "./config/dev.env") });
// deleteGuest()
// deleteImages()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
// routes
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/", setLocation);
app.use("/unStore/api/v1/user", userRoutes);
app.use("/unStore/api/v1/category", categoryRoutes);
app.use("/unStore/api/v1/product", productRoutes);
// app.use('/unStore/api/v1/order', orderRoutes)
app.use("/unStore/api/v1/inventory", invRoutes);
app.use("/unStore/api/v1/cart", cartRoutes);
app.use("/unStore/api/v1/savedProduct", savedProductRoutes);
app.use("/unStore/api/v1/order", OrderRoutes);
app.use("/unStore/api/v1/section", SectionRoutes);
app.use("/unStore/api/v1/contact", ContactRoutes);
app.use("/unStore/api/v1/createGuestUser", createGuestUser);
app.use(
  "/unStore/api/v1/upload",
  upload.single("image"),
  (req: AuthenticatedRequest, res: Response) => {
    //TODO
    // ADD THE LOGIC HERE TO SAVE ARRAY OF IMAGES
    res.send({ filename: req.file?.filename });
  }
);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(400).send(error.message);
  }
});
app.use("**", (req: Request, res: Response) => {
  res.send("Unhandled Route");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  DBConnection();
  console.log("connected Successfully on Port :", port);
});
