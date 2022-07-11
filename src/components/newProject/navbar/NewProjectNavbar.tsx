import { FC } from "react";
import { styles } from "../build/CreateNewProjectStyles";

const NewProjectNavbar: FC = () => {

    return (
        <div className={ styles.wrap_buttons }>
            <div className={ styles.create_project_button }>
                proceed.
            </div>
            <div className={ styles.create_project_button }>
                generate name.
            </div>
        </div>
    )
}

export default NewProjectNavbar