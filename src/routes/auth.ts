import express, {Express, Router, Request, Response } from "express"
const authRouter: Router = express.Router()
import querystring from "query-string"

const scope = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
]





authRouter.get("/auth", (req: Request, res: Response) => {

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.client_id,
      scope: scope,
      redirect_uri: process.env.callback_url,
      state: "Heyy"
    }));

//   res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.client_id}&redirect_uri=${process.env.callback_url}&scope=${scope.join("%20")}&response_type=token&show_dialog=true`);
})

authRouter.get("/auth/callback", (req: Request, res :Response) => {
  res.send("Heyy")
})

export default authRouter