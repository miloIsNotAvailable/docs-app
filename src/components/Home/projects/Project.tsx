import { FC } from "react";
import { styles } from "./ProjectStyles";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectProps {
    title: string
    content: string
}

const Project: FC<ProjectProps> = ( {
    content,
    title
} ) => {

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div 
                className={ styles.display_project }
                whileHover={ { gridRow: 'span 2', height: '100%' } }
            >
                <div className={ styles.display_project_title }>
                    { title }
                </div>
                <div className={ styles.display_project_content }>
                    { content }
                </div>
            </motion.div>  
        </AnimatePresence>
    )
}

export default Project