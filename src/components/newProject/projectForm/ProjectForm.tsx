import { FC, MutableRefObject, useRef } from "react";
import Form from "../../auth/forms/build/Form";
import { styles } from "../build/CreateNewProjectStyles";

interface ProjectFormProps {
    inputRef: MutableRefObject<HTMLInputElement | null>
}

const ProjectForm: FC<ProjectFormProps> = ( { inputRef } ) => {

    return <div className={ styles.wrap_form }>
        <input
            className={ styles.form_input }
            placeholder="project name."
            ref={ inputRef }
        />
    </div> 
}

export default ProjectForm