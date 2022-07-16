import { FC } from "react";
import { styles } from "./ProjectStyles";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProjectProps {
    title: string
    content: string
    id: string
    ind: number
}

const Project: FC<ProjectProps> = ( {
    content,
    title,
    id,
    ind
} ) => {

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div 
                transition={ { delay: ind * .1 } }
                initial={ { opacity: 0, transform: 'translate(0, -100%)' } }
                animate={ { opacity: 1, transform: 'translate(0, 0%)' } }
                exit={ { opacity: 0, transform: 'translate(0, 100%)' } }
                className={ styles.display_project }
                whileHover={ { gridRow: 'span 2', maxHeight: '100%', height: '100%' } }
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