import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema.js';
import { resolver } from './graphql/resolvers.js';
import cors from 'cors'
import pg from 'pg'
import { ORM } from './orm/ORM.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

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

// const orm = new ORM()
// const e = async() => {
//   const data = await orm.delete( { table: 'Users', where:{ username:'jebbeccy' } } )
//   console.log( data )
// }
// e()
app.listen( PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${ PORT }`);
});