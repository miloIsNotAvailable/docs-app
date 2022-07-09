import { buildSchema } from 'graphql'
import fs from 'fs'
// const { buildSchema } = graphql
// Construct a schema, using GraphQL schema language

export const schema = buildSchema( `
  
type UserData {
  username: String
  email: String
  password: String
}

type Query {
  hello: String
}

type Mutation {
  getUserData( username: String, email: String, password: String ): UserData
}
` );