import Quill from "quill";
import { FC, useEffect, useState } from "react";
import { useQuillContext } from "../../../../contexts/QuillContext";
import { default as More } from '../../../../graphics/more.svg'
import { styles } from "../../build/DocStyles";

const FontFamily: FC = () => {

    const quill = useQuillContext()
    const [ fonts, setFonts ] = useState<string[]>( [ 'Arial' ] )
    const [ currentFont, setCurrentFont ] = useState( "Arial" )

    useEffect( () => {
        if( !quill ) return
        setTimeout( () => {
            const FontFamily = Quill.import( 'formats/font' ) 
            const arr = FontFamily?.whitelist
            
            setFonts( arr )
        }, 100 )
    }, [ quill ] )

    useEffect( () => {
        if( !quill ) return
        console.log( currentFont )
        quill.format( 'font', currentFont )
    }, [ currentFont ] )

    return (
        <div className={ styles.font_family } tabIndex={ 2 }>
            <div>{ currentFont }</div>
            <img 
                className={ styles.more } 
                src={ More } 
                alt=""
            />
            <div className={ styles.family_list }>
                { fonts.map( n => (
                    <div 
                        key = { n }
                        className={ styles.font_style }
                        onClick={ () => setCurrentFont( n ) }  
                        style={ {
                            fontFamily: n
                        } }
                    >
                        { n }
                    </div>
                ) ) }
            </div>
        </div>
    )
}

export default FontFamily