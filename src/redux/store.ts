import { configureStore } from '@reduxjs/toolkit'
import { graphqlApi } from './apis/fetchData'
import getUserData from './slices/getUserFormData'
import { graphqlApiPython } from './apis/fetchPythonData'

export const store = configureStore({
  reducer: {
      // graphql api 
      [graphqlApi.reducerPath]: graphqlApi.reducer,
      [graphqlApiPython.reducerPath]: graphqlApiPython.reducer,
      getUserData
  },  
  /**
   * @description define middleware for 
   * automatic caching  
   */
  middleware: (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat([graphqlApi.middleware, graphqlApiPython.middleware]),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch