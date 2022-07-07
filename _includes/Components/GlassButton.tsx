import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlassButton: FC = ( { shipJavaScript }: any ) => {
    const [count, setCount] = useState<number>(0)
    console.log( shipJavaScript )

    const navigate = useNavigate()

    const handleChange: () => void = () => {
        setCount( prev => prev + 1 )
        console.log( count )
        navigate( '/login' )
    }

    return (
        <button  onClick={ handleChange } >
            Add 3
        </button>
    )
}

export default GlassButton