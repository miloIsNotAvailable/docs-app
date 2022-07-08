import { FC } from "react";
import { styles } from "./FormStyles";

type titleType = Omit<string, 'email' | 'password' | 'username'>
interface FormProps {
    title: titleType
    onClick?: () => any
    type?: 'email' | 'password' | 'text'
}

const Form: FC<FormProps> = ( {
    onClick,
    title,
    type="text"
} ) => {

    return (
        <div className={ styles.wrap_form } tabIndex={ 0 }>
            <input 
                className={ styles.form_input }
                placeholder={ title as string }
                onClick={ onClick }
                type={ type }
            />
        </div>
    )
}

export default Form