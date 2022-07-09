import { FC, useEffect } from "react";
import { useDecodeJWTMutation } from "../../redux/apis/fetchData";

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

const Home: FC = () => {

    const[ decodeJWT, { data, isLoading } ] = useDecodeJWTMutation()

    useEffect( () => {

        const token = localStorage.getItem( 'sessionToken' )

        token && decodeJWT( {
            body: DECODE_JWT,
            variables: { token }
        } )
    }, [] )

    data && 
    localStorage.setItem( 'sessionToken', data?.decodeJWT?.newToken )

    console.log( data )

    return (
        <div>
            hi
        </div>
    )
}

export default Home