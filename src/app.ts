import express, { json, Request, Response, urlencoded } from "express";
import { join } from "path";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/avatars", express.static(join(__dirname, "tmp", "avatars")));
app.use("/car-images", express.static(join(__dirname, "tmp", "car-images")));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ Hello: "API" });
});

app.use("/", routes);

export default app;
