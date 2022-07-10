import { FC } from "react";
import NewProject from "./NewProject";
import Project from "./Project";
import { styles } from "./ProjectStyles";

const MapProject: FC = () => {

    return (
        <div className={ styles.map_project }>
            <NewProject/>
            {
                Array(10).fill( { title: 'lorem', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" } )
                .map( ( { title, content }, ind ) => (
                    <Project 
                        key={ ind }
                        title={ title }
                        content={ content }
                    />
                ) )
            }
        </div>
    )
}

export default MapProject