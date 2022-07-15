import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request } from 'graphql-request'
import { argsToArgsConfig } from 'graphql/type/definition';
import { UserDataType } from '../../interfaces/queries/UserData';

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

const check_env = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : 'https://some-python-app.herokuapp.com'

export const graphqlApiPython = createApi( {
    reducerPath: 'graphqlApiPython',
    tagTypes: [ 'Suggestion' ],
    baseQuery: graphqlBaseQuery( 
        { baseUrl: `${ check_env }/graphql` } ),
    endpoints: ( { query, mutation } ) => ( {

        getSuggestion: mutation<any, queryType<{
            userInput: string
        }>>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
                variables
            } )
        } ),
    } )
} )

export const { 
    useGetSuggestionMutation
} = graphqlApiPython