process.on("uncaughtException", (error) => console.log("uncaughtException: ", error));
process.on("unhandledRejection", (error) => console.log("unhandledRejection: ", error));

import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const app = express();

import "./models/database";

import controllers from "./controllers";
app.use("/", controllers);

import { error } from "./middlewares";
app.use(error);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
