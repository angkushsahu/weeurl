process.on("uncaughtException", (error) => console.log("uncaughtException: ", error));
process.on("unhandledRejection", (error) => console.log("unhandledRejection: ", error));

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import "./models/database";
import app from "./app";

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
