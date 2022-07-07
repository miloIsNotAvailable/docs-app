import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.get( '/', ( req: Request, res: Response ) => {
  res.sendFile( join( process.cwd(), '.', 'index.html' ) )
} )

app.use( '*', express.static( join( process.cwd(), '.' ) ))

app.listen( PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${ PORT }`);
});