import { buildSchema } from 'graphql'
import fs from 'fs'
// Construct a schema, using GraphQL schema language

export const schema = buildSchema( `
  
type UserData {
  id: String
  username: String
  email: String
  password: String
  sessionToken: String
}

type LoginUserData {
  id: String
  username: String
  email: String
  password: String
  sessionToken: String
  accessToken: String
}

type decodeJWT {
  token: String
  newToken: String
  data: UserData
}

type logOut {
  id: String
}

type newProject {
  id: String
  userId: String
  title: String
  content: String
}

type Project {
  user_id: String
  id: String
  title: String
  content: String
}

type updateContent {
  id: String,
  content: String
}

type Query {
  hello: String
  projects( userId: String ): [Project]
  getProjectById( id: String ): Project
}

type Mutation {
  getUserData( username: String, email: String, password: String ): UserData
  logInUser( username: String, email: String, password: String ): LoginUserData
  decodeJWT( token: String ): decodeJWT
  logOutUser( id: String ): logOut
  updateDocContent( id: String, content: String ): updateContent
  getNewProject( userId: String, content: String, title: String ): newProject
}
` );