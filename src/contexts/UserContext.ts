import { createContext, useContext } from "react";

export type UserType = { 
        id: string, 
        username: string, 
        email: string,
        newToken: string,
        isLoading: boolean
    }

export const UserContext = createContext<Partial<UserType>>( {
    email: undefined,
    id: undefined,
    username: undefined,
    newToken: undefined,
    isLoading: false
} )
export const UserContextProvider = UserContext.Provider

export const useUserData: () => [Partial<UserType>] = () => {

    const context = useContext( UserContext )

    return [ context ]
}