import express, { Request, Response } from "express";
import WeeUrl from "../models/schema";
const app = express();

app.get("/", async (req: Request, res: Response) => {
    const urlList = await WeeUrl.find();
    res.render("index", { urlList });
});

app.post("/short-url", async (req: Request, res: Response) => {
    const { fullUrl } = req.body;
    await WeeUrl.create({ fullUrl });
    res.redirect("/");
});

app.get("/:shorturl", async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const url = await WeeUrl.findOne({ shortUrl });
    if (!url) {
        // todo: can add a 404 custom webpage later
        return res.sendStatus(404);
    }
    url.clicks++;
    await url.save();

    res.redirect(url.fullUrl);
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ success: false, message: "This route does not exist" });
});

export default app;
