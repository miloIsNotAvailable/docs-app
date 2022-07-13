import { FC } from "react";
import { styles } from "../../build/DocStyles";
import FontWeight from "../edit/FontWeight";

const Navbar: FC = () => {

    return (
        <div className={ styles.navbar }>
            <FontWeight/>
        </div>
    )
}

export default Navbar