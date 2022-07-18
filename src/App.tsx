import { useEffect } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { UserContextProvider } from './contexts/UserContext'
import Router from './pages/routes'
import { useDecodeJWTMutation } from './redux/apis/fetchData'

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

function App() {

  const[ decodeJWT, { data, isLoading } ] = useDecodeJWTMutation( {
    fixedCacheKey: 'login-result'
  } )
  // const [ createUser, { data: getUserData } ] = useSendUserDataMutation( {
  //     fixedCacheKey: 'sign-up-result'
  //   } )

  // const navigate = useNavigate()

  // useEffect( () => {

  //     const token = localStorage.getItem( 'sessionToken' )

  //     token && decodeJWT( {
  //         body: DECODE_JWT,
  //         variables: { token }
  //     } )
  // }, [] )

  // useEffect( () => {
  //     !isLoading && data && !data?.decodeJWT?.newToken
  //     && navigate( "/" )
  // }, [ data, isLoading ] )

  data && 
  localStorage.setItem( 'sessionToken', data?.decodeJWT?.newToken )
  console.log( data )


  return (
    <UserContextProvider value={ {...data?.decodeJWT?.data, newToken: data?.decodeJWT?.newToken, isLoading} || { id: undefined, username: undefined, email: undefined, newToken: undefined, isLoading: false } }>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
