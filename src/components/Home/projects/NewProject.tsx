import { FC } from "react";
import { Link } from "react-router-dom";
import { styles } from "./ProjectStyles";

const NewProject: FC = () => {

    return (
        <Link to="/new_project" className={ styles.new_project }>
            +
        </Link>
    )
}

export default NewProject