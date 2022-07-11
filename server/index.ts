import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema.js';
import { resolver } from './graphql/resolvers.js';
import cors from 'cors'
import { ORM } from './orm/ORM.js';
import { connect } from './orm/connectdb.js';

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
//   try {
    
//     const client = await connect()
//     const data = await client.query( "CREATE TABLE Project( id STRING PRIMARY KEY, title STRING, content STRING, user_id STRING, FOREIGN KEY( user_id ) REFERENCES Users(id) );" )
//     console.log( data )
//   }catch(e) {
//     console.log( e )
//   }
// }
// e()

app.listen( PORT, () => {
  console.log(`⚡️ Server is running at https://localhost:${ PORT }`);
});