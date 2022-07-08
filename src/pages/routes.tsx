import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from '../components/auth/login/build/Login'

const Router: FC = () => {

    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={ location } key={ location.pathname }>
                <Route path="/" element={ <Login/> }/>
                <Route path="/home" element={ <div>hi</div> }/>
            </Routes>
        </AnimatePresence>
    )
}

export default Router