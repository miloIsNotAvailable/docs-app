import { FC } from "react";
import { useUserData } from "../../../contexts/UserContext";
import { styles } from "./CreateNewProjectStyles";
import Form from "../../auth/forms/build/Form";
import NewProjectNavbar from "../navbar/NewProjectNavbar";
import ProjectForm from "../projectForm/ProjectForm";

const CreateNewProject: FC = () => {

    const [ context ] = useUserData()
    console.log( context )

    return (
        <div className={ styles.new_project_wrap }>
            <div className={ styles.new_project_title }>
                { 'name your \nproject. ⮋' }
            </div>
            <ProjectForm/>
            <NewProjectNavbar/>
        </div>
    )
}

export default CreateNewProject