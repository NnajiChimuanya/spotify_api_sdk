import express, {Express, Router, Request, Response } from "express"
const authRouter: Router = express.Router()
import querystring from "query-string"
import pkg from "request"
const { post} = pkg


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
      state: process.env.state
    }));

  })

authRouter.get("/auth/callback", (req: Request, res :Response) => {
  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.callback_url,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
      },
      json: true
    };
    post(authOptions, (err, data) => {
      if(err) console.log(err)
      res.cookie('token', data.body.access_token)
      res.json(data.body)
    } )
   
  }
})

export default authRouter