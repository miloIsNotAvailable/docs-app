import React from 'react'
import ReactDOM from 'react-dom/client'
import GlassButton from './GlassButton'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlassCounter from '../GlassCounter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={ <GlassButton /> }/>
          <Route path="/login" element={ <GlassCounter /> }/>
      </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
