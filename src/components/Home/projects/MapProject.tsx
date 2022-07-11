import { FC, useEffect } from "react";
import { useUserData } from "../../../contexts/UserContext";
import { useGetUserProjectsQuery, useLazyGetUserProjectsQuery } from "../../../redux/apis/fetchData";
import NewProject from "./NewProject";
import Project from "./Project";
import { styles } from "./ProjectStyles";

const GET_PROJECTS = `
query userProject( $userId:String ){
    projects( userId: $userId ){
      user_id
      id
      title
      content
    }
  }`

const MapProject: FC = () => {

    const [ { id } ] = useUserData()
    const [getUserProjects, { data, isLoading } ]= useLazyGetUserProjectsQuery()
    
    useEffect( () => {
        if( !id ) return
        getUserProjects( {
            body: GET_PROJECTS,
            variables: {
                userId: id!
            }
        } )
    }, [ id ] )

    console.log( data?.projects )

    return (
        <div className={ styles.map_project }>
            <NewProject/>
            {
                !isLoading && data?.projects
                .map( ( { title, content, id }: any, ind: number ) => (
                    <Project 
                        id={ id }
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