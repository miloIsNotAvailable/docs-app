import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../contexts/UserContext";
import { useLogOutUserMutation } from "../../../redux/apis/fetchData";
import Navbar from "../navbar/Navbar";
import DisplayProjects from "../projects/DisplayProjects";
import Bg from "./Bg";
import { styles } from "./HomeStyles";
import Title from "./Title";
import { motion } from "framer-motion";

const DECODE_JWT = `
mutation jwt($token:String) {
    decodeJWT(token: $token){
      token
      newToken
      data {
          id
          username
          email
      }
    }
  }  
`

const LOG_OUT = `
mutation logOutUser($id: String){
    logOutUser(id: $id){
      id
    }
  }`

const Home: FC = () => {

    // const[ decodeJWT, { data, isLoading } ] = useDecodeJWTMutation()
    // const [ createUser, { data: getUserData } ] = useSendUserDataMutation( {
    //     fixedCacheKey: 'sign-up-result'
    //   } )

    const [ { email, id, username, isLoading, newToken } ] = useUserData()

    const navigate = useNavigate()

    // useEffect( () => {

    //     const token = localStorage.getItem( 'sessionToken' )

    //     token && decodeJWT( {
    //         body: DECODE_JWT,
    //         variables: { token }
    //     } )
    // }, [] )

    useEffect( () => {
        !isLoading && email && !newToken
        && navigate( "/" )
    }, [ email, isLoading ] )

    email && 
    localStorage.setItem( 'sessionToken', newToken! )
    // console.log( data )

    const [ logOutUser, logout ] = useLogOutUserMutation()

    const handleLogOut: () => void = () => {
        logOutUser( {
            body: LOG_OUT,
            variables: { 
                id: id! 
            }
        } )
        localStorage.setItem( 'sessionToken', "" )
        setTimeout( () => {
            navigate( '/' )
        }, 100 )
    }

    return (
        <motion.div 
            className={ styles.home_wrap }
            initial={ { transform: 'translate(-100%, 0)' } }
            animate={ { transform: 'translate(0%, 0)' } }
            exit={ { transform: 'translate(100%, 0)' } }
        >
            <div onClick={ handleLogOut }>
                <Navbar/>
            </div>
            <div className={ styles.fill }/>
            <div className={ styles.fill }/>
            <Bg/>
            <div className={ styles.fill }/>
            <Title/>
            <div className={ styles.fill }/>
            <div className={ styles.fill }/>
            <DisplayProjects/>
            <div className={ styles.fill }/>
            <div className={ styles.fill }/>
            <div className={ styles.fill }/>
            <div className={ styles.fill }/>
        </motion.div>
    )
}

export default Home