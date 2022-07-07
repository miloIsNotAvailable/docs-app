import graphql from 'graphql'
const { buildSchema } = graphql
// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  type Query {
    hello: String
  }
`);