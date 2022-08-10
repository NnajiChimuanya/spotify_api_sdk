import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from "./routes/auth"
import playlistRouter from './routes/playlist';
import cookieParser from "cookie-parser"

dotenv.config();

const app: Express = express();
app.use(express.json())
const port = process.env.PORT || 3000

console.log(process.env.base_url)

app.use(cookieParser())
app.use("/", authRouter)
app.use("/", playlistRouter)




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});