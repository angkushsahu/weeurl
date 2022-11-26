import { Schema, model } from "mongoose";
import shortId from "shortid";

interface IWeeUrl {
    fullUrl: string;
    shortUrl: string;
    clicks: number;
}

const WeeUrlSchema = new Schema(
    {
        fullUrl: { type: String, required: [true, "Please enter the original url to your website"] },
        shortUrl: {
            type: String,
            required: [true, "Unable to process the short url to your website"],
            default: shortId.generate,
        },
        clicks: {
            type: Number,
            required: [true, "Unable to process the number of clicks to your website"],
            default: 0,
        },
    },
    { timestamps: true }
);

export default model<IWeeUrl>("WeeUrl", WeeUrlSchema);
