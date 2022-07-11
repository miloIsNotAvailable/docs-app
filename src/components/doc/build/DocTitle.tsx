import { FC } from "react";
import { useDocData } from "../../../contexts/DocContext";
import { styles } from "./DocStyles";
import { default as DocIcon } from '../../../graphics/DocIcon.svg'

const DocTitle: FC = () => {

    const [ { title } ] = useDocData()

    return (
        <div className={ styles.doc_title_wrap }>
            <img src={ DocIcon } className={ styles.doc_icon }/>
            <div className={ styles.doc_title }>
                { title }
            </div>
        </div>
    )
}

export default DocTitle