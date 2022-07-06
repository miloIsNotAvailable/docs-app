import React, { FC, useState } from "react";

const GlassButton: FC = () => {
    const [count, setCount] = useState<number>(0)
    
    const handleChange: () => void = () => {
        setCount( prev => prev + 1 )
        console.log( count )
    }

    return (
        <button onClick={ handleChange } >
            Add 2
        </button>
    )
}

export default GlassButton