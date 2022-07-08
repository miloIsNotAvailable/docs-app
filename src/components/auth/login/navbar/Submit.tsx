import { FC } from "react";
import { getUserDataState } from "../../../../interfaces/redux/reduxInterfaces";
import { useAppSelector } from "../../../../redux/hooks";
import { styles } from "../build/LoginStyles";

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

     /**
      * @function handleSubmit
      * @returns email and password 
      * unless email is invalid or not provided
      */
    const handleSubmit: () => void = () => {
        if( !email || !validateEmail( email ) || !password ) return
        console.log( email, password )   
    }

    return (
        <div 
            className={ styles.login_submit }
            onClick={ handleSubmit }>
            proceed
        </div>
    )
}

export default Submit