import express, {Express, Router, Request, Response } from "express"
const authRouter: Router = express.Router()

authRouter.get("/auth", (req: Request, res: Response) => {
    res.send("Heyyyyyyyy")
})

export default authRouter