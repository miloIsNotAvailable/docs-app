import Quill from "quill"
import { useEffect, useState } from "react"

export const useQuill: () => Quill | null = () => {
    
    const [ getQuill, setQuill ] = useState<Quill | null>( null )  

    const doc = document.getElementById( 'main-doc' )
    useEffect( () => {
        if( !doc ) return
        const quill = new Quill( '#main-doc' )
        setQuill( quill )
    }, [ doc ] )

    return getQuill
}