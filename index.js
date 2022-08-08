import express from "express";
const port = process.env.PORT || 3000;
const app = express();
import { Spotify } from "./mainSDK/spotifySdk.js";

app.get("/", (req, res) => {
  const ei = new Spotify();
  console.log(ei.name);
});

app.listen(port, () => console.log("Now listening"));
