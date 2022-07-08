import { FC } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { setEmail } from "../../../../redux/slices/getUserFormData";
import Form from "../build";

const Email: FC = () => {

    const dispatch = useAppDispatch()

    const handleChange: () => void = () => {
        dispatch( setEmail( {
            email: ''
        } ) )
    }

    return <Form 
        title="your email"
        type="email"
        onClick={ handleChange }
    />
}

export default Email