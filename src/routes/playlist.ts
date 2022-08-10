import express, {Express, Router, Request, Response } from "express"
const playlistRouter: Router = express.Router()
import pkg from "request"
const { post, get} = pkg


playlistRouter.get("/playlists/:id", (req, res) => {
    console.log(req.params)
    get(`${process.env.base_url}/v1/playlists/3cEYpjA9oz9GiPac4AsH4n`, (err, data) => {
        if(err) throw err
        res.json(data)
    })
})









export default playlistRouter