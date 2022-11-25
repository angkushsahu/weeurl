import { connect } from "mongoose";

connect(process.env.DB_URI || "mongodb://localhost:27017/weeurl")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.log(error);
    });
