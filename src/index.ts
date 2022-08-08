import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from "./routes/auth"


dotenv.config();

const app: Express = express();
app.use(express.json())
const port = process.env.PORT || 3000

app.use("/", authRouter)




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});