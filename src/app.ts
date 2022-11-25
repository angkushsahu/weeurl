import express from "express";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
app.use(express.json({ limit: "1000mb" }));

import controllers from "./controllers";
app.use("/", controllers);

import { error } from "./middlewares";
app.use(error);

export default app;
