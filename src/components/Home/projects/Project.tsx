import { FC } from "react";
import { styles } from "./ProjectStyles";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProjectProps {
    title: string
    content: string
    id: string
}

const Project: FC<ProjectProps> = ( {
    content,
    title,
    id
} ) => {

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div 
                className={ styles.display_project }
                whileHover={ { gridRow: 'span 2', height: '100%' } }
            >
                <Link to={ `/home/${ id }` }>
                    <div className={ styles.display_project_title }>
                        { title }
                    </div>
                    <div className={ styles.display_project_content }>
                        { content }
                    </div>
                </Link>
            </motion.div>  
        </AnimatePresence>
    )
}

export default Project