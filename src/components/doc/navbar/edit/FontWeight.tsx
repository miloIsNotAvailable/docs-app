import { FC, MouseEvent, useEffect, useReducer, useState } from "react";
import { useQuillContext } from "../../../../contexts/QuillContext";
import { default as ItalicIcon } from '../../../../graphics/Italic.svg'
import { default as BoldIcon } from '../../../../graphics/Bold.svg'
import { default as RegularIcon } from '../../../../graphics/Regular.svg'
import { styles } from "../../build/DocStyles";

type OmitVals = 'regular' | 'bold' | 'italic' | Omit<string, 'regular' | 'bold' | 'italic'>

type stateType = { 
    weight: OmitVals, 
    is: boolean 
}
type actionType = { type: OmitVals }

const initialState: stateType = { weight: "regular", is: false }

const reducer: ( 
    state: stateType, 
    action: actionType 
) => stateType = ( { is, weight }, action ) => {
    switch( action.type ) {
        case "bold":
            return { weight: "bold", is: weight === "bold" && !is }
        case "italic":
            return { weight: "italic", is: weight === "italic" && !is }
        default: 
            return { weight: 'regular', is: is }
    }
}

const FontWeight: FC = () => {
    
    const quill = useQuillContext()

    const [ state, dispatch ] = useReducer( reducer, initialState )

    useEffect( () => {
        const { weight, is } = state
        quill?.format( weight as string, is )
    }, [ state ] )
    
    const handleOnClick: ( e: MouseEvent<HTMLDivElement>, type: OmitVals ) => void = ( e, type ) => {
        if( !quill ) return
        e.preventDefault()
        dispatch( { type } ) 
    }

    const arr = [
        { icon: BoldIcon, type: "bold" },
        { icon: ItalicIcon, type: "italic" },
    ]

    return (
        <div className={ styles.font_weights }>
            {
                arr.map( ( { icon, type } ) => (
                    <img 
                        src={ icon } 
                        onClick={ e=> handleOnClick( e, type )  }
                    />
                ) )
            }
        </div>
    )
}

export default FontWeight