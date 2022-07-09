import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDataState } from "../../../../interfaces/redux/reduxInterfaces";
import { useSendUserDataMutation } from "../../../../redux/apis/fetchData";
import { useAppSelector } from "../../../../redux/hooks";
import { styles } from "../build/LoginStyles";

const SEND_USER_DATA =  `
mutation UserData($username:String, $email:String, $password:String) {
    getUserData(username: $username, email:$email, password:$password){
      id
      username
      email
      password
      sessionToken
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

    const { email, password, username } = useAppSelector( 
        ( state: getUserDataState ) => state.getUserData
     )

    const [ createUser, { data, isLoading, isError } ] = useSendUserDataMutation()
    const navigate = useNavigate()

     /**
      * @function handleSubmit
      * @returns email and password 
      * unless email is invalid or not provided
      */
    const handleSubmit: () => void = () => {
        if( 
            !email || 
            !validateEmail( email ) || 
            !password ||
            !username 
        ) return
        // send new user's email name and password
          createUser( {
              body: SEND_USER_DATA,
              variables: {
                  email,
                  password,
                  username
              }
          } )

        // if done loading and user gets created 
        // navigate to home
        !isLoading && !isError && navigate( '/home' )
        data?.getUserData?.sessionToken && 
        localStorage.setItem( 'sessionToken', data?.getUserData?.sessionToken ) 
    }

    return (
        <div 
            className={ styles.login_submit }
            style={ {
                opacity: !email || !validateEmail( email ) || !password ? .5 : 1
            } }
            onClick={ handleSubmit }>
            { isLoading ? 'loading...' : 'proceed' }
        </div>
    )
}

export default Submit