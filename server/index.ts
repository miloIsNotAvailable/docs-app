import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema.js';
import { resolver } from './graphql/resolvers.js';
import cors from 'cors'

dotenv.config();

const app: Express = express();
const PORT = 4000;

app.use( cors( {
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  origin: ['http://localhost:3000', 'https://docs-app-miloisnotavailable.vercel.app']
} ) )

app.get( '/', ( req: Request, res: Response ) => {
  res.sendFile( join( process.cwd(), '.', 'index.html' ) )
} )

// app.use( '*', express.static( join( process.cwd(), '.' ) ))
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));

app.listen( PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${ PORT }`);
});