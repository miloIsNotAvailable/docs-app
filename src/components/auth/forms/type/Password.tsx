import { ChangeEvent, FC } from "react";
import { getUserDataState } from "../../../../interfaces/redux/reduxInterfaces";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setPassword } from "../../../../redux/slices/getUserFormData";
import Form from "../build";
import { styles } from "../build/FormStyles";

const Email: FC = () => {

    const dispatch = useAppDispatch()

    const handleChange: 
    ( e: ChangeEvent<HTMLInputElement> ) => void = e => {
        dispatch( setPassword( {
            password: e.target.value
        } ) )
    }

    const { password } = useAppSelector( 
        ( state: getUserDataState ) => state.getUserData
     )

    return (
        <>
            <Form 
                placeholder={ "your password" }
                type={ "password" }
                onChange={ handleChange }  
            />
            { !password && 
                <div className={ styles.form_input_error }>
                    pass in your password
                </div> 
            }
        </> 
    ) 
}

export default Email