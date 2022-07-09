import { ChangeEvent, FC } from "react";
import { getUserDataState } from "../../../../interfaces/redux/reduxInterfaces";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setEmail, setUsername } from "../../../../redux/slices/getUserFormData";
import Form from "../build";
import { styles } from "../build/FormStyles";

const Email: FC = () => {

    const dispatch = useAppDispatch()

    const handleChange: 
    ( e: ChangeEvent<HTMLInputElement> ) => void = e => {
        dispatch( setUsername( {
            username: e.target.value
        } ) )
    }

    const { username } = useAppSelector( 
        ( state: getUserDataState ) => state.getUserData
     )

    return (
        <>
            <Form 
                placeholder="your username"
                onChange={ handleChange }
            />
            {
                !username &&
                <div className={ styles.form_input_error }>
                    pass in your username
                </div>
            }
        </>
    ) 
}

export default Email