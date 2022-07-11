import { FC, useRef } from "react";
import { useUserData } from "../../../contexts/UserContext";
import { styles } from "./CreateNewProjectStyles";
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
            <NewProjectNavbar />
        </div>
    )
}

export default CreateNewProject