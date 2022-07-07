import React, { useState, FC } from 'react'
import GlassButton from './GlassButton'

const GlassCounter: FC = ( ) => {
  const [count, setCount] = useState<number>(0)
  return (
    <div>
      <p className='wrap'>You've had around {count} glasses of water 💧</p>
      <p className='wrap'>{ '{% react GlassCounter.tsx true%}' }</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </div>
  )
}

export default GlassCounter