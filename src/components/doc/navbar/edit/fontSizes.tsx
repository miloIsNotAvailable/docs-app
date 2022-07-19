import Quill from "quill";
import { FC, useEffect, useRef, useState } from "react";
import { useQuillContext } from "../../../../contexts/QuillContext";
import { default as More } from '../../../../graphics/more.svg'
import { styles } from "../../build/DocStyles";
import { findClosest } from "./findClosest";

type arrType = '10px' |  '11px' | '12px' | '13px' | '14px' | '16px' | '20px' | '24px' | '32px' | '36px' | '40px' | '64px' | '96px'

const FontSizes: FC = () => {

    const quill = useQuillContext()
    
    const [fontSizes, setFontSizes] = useState<arrType[]>( [ "11px" ] )
    const [ currentSize, setCurrentSize ] = useState<arrType>( '11px' )

    const inputRef = useRef<HTMLDivElement | null>( null )

    useEffect( () => {
        if( !quill ) return 
        // settimeout so font sizes can load in
        setTimeout( () => {
            const Sizes = Quill.import( "formats/size" )
            const arr = Sizes?.whitelist
            setFontSizes( arr )
        }, 100 )
    }, [ quill ] )

    useEffect( () => {
        if( !quill ) return
        quill.format( 'size', currentSize )
    }, [ currentSize ] )

    return (
        <div className={ styles.font_sizes_wrap } tabIndex={ 1 }>
            <div className={ styles.current_font_size }>
                <div 
                    onDoubleClick={ () => {
                        inputRef.current!.contentEditable = "true"
                    } }
                    onBlur={ () => {
                        inputRef.current!.contentEditable = "false"
                        
                        if( !inputRef.current?.innerText || !parseInt( inputRef.current?.innerText ) ) { 
                            quill?.format( 'size', '11px' ); 
                            return 
                        }
                        /**
                         * when input size does not exist
                         * in whitelist, change it to the closest 
                         * available
                         */
                        setCurrentSize( 
                            findClosest(
                                parseInt(inputRef.current?.innerText)
                                , fontSizes
                            ) as arrType 
                        )
                    } }  
                    className={ styles.font_size_input }
                    ref={ inputRef } 
                >
                    { currentSize }
                </div>
                <img 
                    className={ styles.more } 
                    src={ More } 
                    alt=""
                />
            </div>
            <ul className={ styles.sizes_list }>
                {
                    fontSizes.map( 
                        n => (
                            <li 
                                key={ n } 
                                onClick={ () => setCurrentSize( n ) }
                            >
                                { n }
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default FontSizes