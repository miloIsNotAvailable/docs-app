import { FC, useRef } from "react";
import { useUserData } from "../../../contexts/UserContext";
import { styles } from "./CreateNewProjectStyles";
import NewProjectNavbar from "../navbar/NewProjectNavbar";
import ProjectForm from "../projectForm/ProjectForm";
import { motion } from "framer-motion";

const CreateNewProject: FC = () => {

    const [ context ] = useUserData()
    console.log( context )

    return (
        <motion.div 
            className={ styles.new_project_wrap }
            initial={ { transform: 'translate(-100%, 0)' } }
            animate={ { transform: 'translate(0%, 0)' } }
            exit={ { transform: 'translate(100%, 0)' } }
        >
            <div className={ styles.new_project_title }>
                { 'name your \nproject. ⮋' }
            </div>
            <NewProjectNavbar />
        </motion.div>
    )
}

export default CreateNewProject