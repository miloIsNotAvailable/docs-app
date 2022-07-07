import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request } from 'graphql-request'
import { argsToArgsConfig } from 'graphql/type/definition';

/**
 * 
 * @param graphqlBaseQuery
 * @returns query requests for graphql
 * 
 * every graphql query or mutation will 
 * take body which is the query schema
 * and variables 
 */
const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): any =>
  async ({ body, variables }: any) => {
    const result = await request(baseUrl, body, variables);
    return { data: result };
  }

type queryType<T=undefined> = {
    body: string, 
    variables: T
}

const check_env = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : 'https://docs-stuff.herokuapp.com/'

export const graphqlApi = createApi( {
    reducerPath: 'graphqlApi',
    tagTypes: ['Hello', 'Theme'],
    baseQuery: graphqlBaseQuery( 
        { baseUrl: `${ check_env }/graphql` } ),
    endpoints: ( { query, mutation } ) => ( {
        // query all docs 
        getAllPosts: query<any, queryType<undefined>>( {
            providesTags: ['Hello'],
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
                variables
            } )
        } )
    } )
} )

export const { 
    useGetAllPostsQuery
} = graphqlApi