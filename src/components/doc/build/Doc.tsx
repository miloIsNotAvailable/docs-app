import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DocContextProvider } from "../../../contexts/DocContext";
import { useLazyGetProjectQuery } from "../../../redux/apis/fetchData";
import Mainscreen from "../mainscreen/Mainscreen";
import Navbar from "../navbar/Navbar";
import TopNavbar from "../navbar/TopNavbar";
import { styles } from "./DocStyles";
import DocTitle from "./DocTitle";

const GET_PROJECT = `
query userProject( $id:String ){
    getProjectById( id: $id ){
      user_id
      id
      title
      content
    }
  }  
`

const Doc: FC = () => {

    const { id } = useParams()
    console.log( id )

    const [getProject, { data, isLoading }] = useLazyGetProjectQuery()

    useEffect( () => {
        if( !id ) return

        getProject( {
            body: GET_PROJECT,
            variables: { id: id! }
        } )
    }, [ id ] )
    
    console.log( data )

    return (
        <DocContextProvider value={ data?.getProjectById || { content: undefined, id: undefined, title: undefined, user_id: undefined } }>
            <div className={ styles.doc_wrap }>
                <DocTitle/>
                <TopNavbar/>
                <div className={ styles.main_doc_wrap }>
                    <Navbar/>
                    <Mainscreen/>
                </div>
            </div>
        </DocContextProvider>
    )
}

export default Doc