import { FC, MutableRefObject, useRef } from "react";
import { useUserData } from "../../../contexts/UserContext";
import { useCreateProjectMutation } from "../../../redux/apis/fetchData";
import { styles } from "../build/CreateNewProjectStyles";
import { genRandomTitle } from "./generateRandomTitle";

const CREATE_PROJECT = `
    mutation newProject( $userId:String, $content: String, $title: String ) {
        getNewProject( userId: $userId, content: $content, title:$title ) {
            id
            userId
            title
            content
        }
    }
`

const NewProjectNavbar: FC = ( ) => {

    const inputRef = useRef<HTMLInputElement | null>( null )
    const [ createNewProject, { data, isLoading } ] = useCreateProjectMutation()
    const [ { id } ] = useUserData()

    const handleGenRandomTitle: () => void = () => {
        if( !inputRef.current ) return
        inputRef.current.value = genRandomTitle()
    }

    const handleCreateNewProject: () => void = () => {
        if( !inputRef.current?.value.trim() || !id ) return

        createNewProject( {
            body: CREATE_PROJECT,
            variables: {
                content: "",
                title: inputRef.current.value?.trim(),
                userId: id!
            }
        } )
    }

    return (
        <>
            <div className={ styles.wrap_form }>
                <input
                    className={ styles.form_input }
                    placeholder="project name"
                    ref={ inputRef }
                />
            </div> 
            <div className={ styles.wrap_buttons }>
                <div className={ styles.create_project_button }
                    onClick={ handleCreateNewProject }>
                    { isLoading ? 'loading...' : 'proceed' }
                </div>
                <div className={ styles.create_project_button }
                onClick={ handleGenRandomTitle }>
                    generate name
                </div>
            </div>
        </>
    )
}

export default NewProjectNavbar