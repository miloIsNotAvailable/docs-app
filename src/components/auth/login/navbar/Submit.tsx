import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDataState } from "../../../../interfaces/redux/reduxInterfaces";
import { useLogInUserMutation } from "../../../../redux/apis/fetchData";
import { useAppSelector } from "../../../../redux/hooks";
import { styles } from "../build/LoginStyles";

const SEND_USER_DATA =  `
mutation getUserLogin($username:String, $email:String, $password:String) {
    logInUser(username: $username, email:$email, password:$password){
      id
      username
      email
      password
      sessionToken
      accessToken
    }
  }  
`

const validateEmail: 
( email: string ) => RegExpMatchArray | null 
= email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const Submit: FC = () => {

    const { email, password } = useAppSelector( 
        ( state: getUserDataState ) => state.getUserData
     )

     const [ logInUser, { data, isLoading, isError } ] = useLogInUserMutation()
     const navigate = useNavigate()

     /**
      * @function handleSubmit
      * @returns email and password 
      * unless email is invalid or not provided
      */
    const handleSubmit: () => void = () => {
        if( !email || !validateEmail( email ) || !password ) return
        logInUser( {
            body: SEND_USER_DATA,
            variables: {
                email,
                password
            }
        } )   
        data && navigate( "/home" )
        data?.logInUser?.accessToken && 
        localStorage.setItem( 'sessionToken', data?.logInUser?.accessToken ) 
    }

    return (
        <div 
            className={ styles.login_submit }
            style={ {
                opacity: !email || !validateEmail( email ) || !password ? .5 : 1
            } }
            onClick={ handleSubmit }>
            { isLoading ? "loading" : 'proceed' }
        </div>
    )
}

export default Submit