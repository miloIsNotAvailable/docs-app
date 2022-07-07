import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.get( '/', ( req: Request, res: Response ) => {
  res.send( 'johnDoe' )
} )

app.listen( PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${ PORT }`);
});