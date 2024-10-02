import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

let sessionKey: string | undefined;

app.get("/auth", (req: Request, res: Response) => {
  const apiKey = process.env.LASTFM_API_KEY;
  const callbackURL = process.env.CALLBACK_URL;
  const authUrl = `http://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackURL}`;
  res.redirect(authUrl);
});

app.get("/callback", async (req: Request, res: Response) => {
  const token = req.query.token as string;
  const apiKey = process.env.LASTFM_API_KEY;
  const apiSecret = process.env.LASTGM_API_SECRET;
});
