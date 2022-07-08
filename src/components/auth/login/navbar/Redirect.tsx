import { FC } from "react";
import { Link } from "react-router-dom";
import { styles } from "../build/LoginStyles";

const Redirect: FC = () => {

    return (
        <Link 
            to="/register" 
            className={ styles.login_redirect }
        >
            regitser
        </Link>
    )
}

export default Redirect