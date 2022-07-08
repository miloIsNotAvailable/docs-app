import { DetailedHTMLProps, FC, InputHTMLAttributes, MutableRefObject } from "react";
import { styles } from "./FormStyles";
/**
 * 
 * @function Form
 * @description form layout, 
 * it takes the same props as HTML input 
 */
const Form: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ( 
    v: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) => {

    return (
        <div className={ styles.wrap_form } tabIndex={ 0 }>
            <input 
                className={ styles.form_input }
                { ...v }
            />
        </div>
    )
}

export default Form