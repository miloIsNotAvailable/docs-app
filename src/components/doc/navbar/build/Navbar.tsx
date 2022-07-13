import { FC } from "react";
import { styles } from "../../build/DocStyles";
import FontFamily from "../edit/FontFamily";
import FontSizes from "../edit/fontSizes";
import FontWeight from "../edit/FontWeight";

const Navbar: FC = () => {

    return (
        <div className={ styles.navbar }>
            <FontFamily/>
            <div className={ styles.wrap_navbar_row }>
                <FontSizes/>
                <FontWeight/>
            </div>
        </div>
    )
}

export default Navbar