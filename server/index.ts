import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs'
import { createServer } from 'vite'
import path from 'path'

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express server');
});

app.listen( PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${ PORT }`);
});

// initServer()