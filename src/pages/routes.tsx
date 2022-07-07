import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'

const Router: FC = () => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Login/> }/>
            <Route path="/home" element={ <div>hi</div> }/>
        </Routes>
        </BrowserRouter>
    )
}

export default Router