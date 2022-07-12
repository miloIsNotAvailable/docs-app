import { FC, useEffect } from "react";
import { styles } from "../build/DocStyles";
import Quill from 'quill'  
import { useQuill } from "../../../constants/quillConstants";

const Mainscreen: FC = () => {

    const quill = useQuill()
    console.log( quill )

    return (
        <div id="main-doc" className={ styles.main_doc }>

        </div>
    )
}

export default Mainscreen