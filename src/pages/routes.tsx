import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from '../components/auth/login/build/Login'
import Signup from '../components/auth/signup/build/Signup'
import Doc from '../components/doc/build/Doc'
import Home from '../components/Home/build/Home'
import CreateNewProject from '../components/newProject/build/CreateNewProject'

const Router: FC = () => {

    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={ location } key={ location.pathname }>
                <Route path="/" element={ <Login/> }/>
                <Route path="/signup" element={ <Signup/> }/>
                <Route path="/home" element={ <Home/> }/>
                <Route path="/new_project" element={ <CreateNewProject/> }/>
                <Route path="/home/:id" element={ <Doc/> }/>
            </Routes>
        </AnimatePresence>
    )
}

export default Router