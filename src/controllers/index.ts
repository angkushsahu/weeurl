import express, { Request, Response } from "express";
import WeeUrl from "../models/schema";
import { join } from "path";
const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));
app.use(express.static(join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
app.use(express.json({ limit: "1000mb" }));

app.get("/", async (req: Request, res: Response) => {
    const urlList = await WeeUrl.find();
    res.render("index", { urlList });
});

app.post("/short-url", async (req: Request, res: Response) => {
    const { fullUrl } = req.body;
    await WeeUrl.create({ fullUrl });
    res.redirect("/");
});

app.get("/:shortUrl", async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const url = await WeeUrl.findOne({ shortUrl });
    if (!url) {
        return res.status(404).render("error");
    }
    url.clicks++;
    await url.save();

    res.redirect(url.fullUrl);
});

app.use((req: Request, res: Response) => {
    res.status(404).render("error");
});

export default app;
