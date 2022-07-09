import { FC } from "react";
import { Link } from "react-router-dom";
import { styles } from "../build/LoginStyles";

const Redirect: FC = () => {

    return (
        <Link 
            to="/" 
            className={ styles.login_redirect }
        >
            back
        </Link>
    )
}

export default Redirect