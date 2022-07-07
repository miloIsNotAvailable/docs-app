import { configureStore } from '@reduxjs/toolkit'
import { graphqlApi } from './apis/fetchData'
// ...
export const store = configureStore({
  reducer: {
      // graphql api 
      [graphqlApi.reducerPath]: graphqlApi.reducer
  },  
  /**
   * @description define middleware for 
   * automatic caching  
   */
  middleware: (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(graphqlApi.middleware),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch