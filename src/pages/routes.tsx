import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from '../components/auth/login/build/Login'
import Signup from '../components/auth/signup/build/Signup'
import Home from '../components/Home/Home'

const Router: FC = () => {

    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={ location } key={ location.pathname }>
                <Route path="/" element={ <Login/> }/>
                <Route path="/signup" element={ <Signup/> }/>
                <Route path="/home" element={ <Home/> }/>
            </Routes>
        </AnimatePresence>
    )
}

export default Router