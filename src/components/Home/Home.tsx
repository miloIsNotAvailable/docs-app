import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDecodeJWTMutation, useLogOutUserMutation, useSendUserDataMutation } from "../../redux/apis/fetchData";

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

    const[ decodeJWT, { data, isLoading } ] = useDecodeJWTMutation()
    // const [ createUser, { data: getUserData } ] = useSendUserDataMutation( {
    //     fixedCacheKey: 'sign-up-result'
    //   } )

    const navigate = useNavigate()

    useEffect( () => {

        const token = localStorage.getItem( 'sessionToken' )

        token && decodeJWT( {
            body: DECODE_JWT,
            variables: { token }
        } )
    }, [] )

    useEffect( () => {
        !isLoading && data && !data?.decodeJWT?.newToken
        && navigate( "/" )
    }, [ data, isLoading ] )

    data && 
    localStorage.setItem( 'sessionToken', data?.decodeJWT?.newToken )
    console.log( data )

    const [ logOutUser, logout ] = useLogOutUserMutation()

    const handleLogOut: () => void = () => {
        logOutUser( {
            body: LOG_OUT,
            variables: { 
                id: data?.decodeJWT?.data?.id 
            }
        } )
        localStorage.setItem( 'sessionToken', "" )
        setTimeout( () => {
            navigate( '/' )
        }, 100 )
    }

    return (
        <div onClick={ handleLogOut }>
            hi
        </div>
    )
}

export default Home