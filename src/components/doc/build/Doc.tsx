import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuill } from "../../../constants/quillConstants";
import { DocContextProvider } from "../../../contexts/DocContext";
import { QuillContextProvider } from "../../../contexts/QuillContext";
import { useLazyGetProjectQuery } from "../../../redux/apis/fetchData";
import Mainscreen from "../mainscreen/Mainscreen";
import Navbar from "../navbar/build/Navbar";
import TopNavbar from "../navbar/build/TopNavbar";
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
    const quill = useQuill()

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
        <QuillContextProvider value={ quill }>
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
        </QuillContextProvider>
    )
}

export default Doc