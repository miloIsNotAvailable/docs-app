import { FC } from "react";
import MapProject from "./MapProject";
import { styles } from "./ProjectStyles";

const DisplayProjects: FC = () => {
    
    return (
        <div className={ styles.display_project_wrap }>
            <MapProject/>
        </div>
    )
}
export default DisplayProjects