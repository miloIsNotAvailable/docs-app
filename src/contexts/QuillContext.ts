import Quill from "quill";
import { createContext, useContext } from "react";

export const QuillContext = createContext<Quill | null>( null )
export const QuillContextProvider = QuillContext.Provider
export const useQuillContext: () => Quill | null = () => {

    const context = useContext( QuillContext )
    return context
}