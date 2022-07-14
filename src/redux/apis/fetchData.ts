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

const check_env = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : 'https://docs-stuff.herokuapp.com'

export const graphqlApi = createApi( {
    reducerPath: 'graphqlApi',
    tagTypes: ['Hello', 'Theme', 'Project'],
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
        } ),
        /**
         * @param sendUserData
         * sends user data to the server
         */
        sendUserData: mutation<any, queryType<UserDataType>>( {
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
                variables
            } ),
            async onQueryStarted( { body, variables }, { dispatch, queryFulfilled } ) {
                try {
                    const { data } = await queryFulfilled
                    console.log( data )
                }catch( e ) {}
            }
        } ),
        logInUser: mutation<any, queryType<Partial<UserDataType>>>( {
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
        decodeJWT: mutation<any, queryType<{token: string}>>( {
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

        logOutUser: mutation<any, queryType<{id: string}>>( {
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

        createProject: mutation<any, queryType<{
            userId: string,
            content: string, 
            title: string,
        }>>( {
            invalidatesTags: [ "Project" ],
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

        getUserProjects: query<any, queryType<{
            userId: string,
        }>>( {
            providesTags: [ "Project" ],
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

        getProject: query<any, queryType<{
            id: string,
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

        updateDocContent: mutation<any, queryType<{
            id: string,
            content: string
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
    useGetAllPostsQuery,
    useSendUserDataMutation,
    useLogInUserMutation,
    useDecodeJWTMutation,
    useLogOutUserMutation,
    useCreateProjectMutation,
    useGetUserProjectsQuery,
    useLazyGetUserProjectsQuery,
    useGetProjectQuery,
    useLazyGetProjectQuery,
    useUpdateDocContentMutation
} = graphqlApi