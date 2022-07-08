import { ChangeEvent, FC } from "react";
import { getUserDataState } from "../../../../interfaces/redux/reduxInterfaces";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setEmail } from "../../../../redux/slices/getUserFormData";
import Form from "../build";
import { styles } from "../build/FormStyles";

const Email: FC = () => {

    const dispatch = useAppDispatch()

    const handleChange: 
    ( e: ChangeEvent<HTMLInputElement> ) => void = e => {
        dispatch( setEmail( {
            email: e.target.value
        } ) )
    }

    const { email } = useAppSelector( 
        ( state: getUserDataState ) => state.getUserData
     )

    return (
        <>
            <Form 
                placeholder="your email"
                type="email"
                onChange={ handleChange }
            />
            { !email && 
                <div className={ styles.form_input_error }>
                    pass in your email
                </div> 
            }
        </>
    ) 
}

export default Email