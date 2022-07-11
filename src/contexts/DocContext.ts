import { createContext, useContext } from "react";

type docContextType = {
    id: string | undefined,
    user_id: string | undefined,
    title: String | undefined,
    content: string | undefined

}
export const DocContext = createContext<docContextType>( {
    content: undefined,
    id: undefined,
    title: undefined,
    user_id: undefined
} )

export const DocContextProvider = DocContext.Provider

export const useDocData: () => [ docContextType ] = () => {
    const context = useContext( DocContext )
    return [ context ]
}