import { FC, useCallback, useEffect } from "react";
import { styles } from "../build/DocStyles";
import Quill from "quill";
import { useQuillContext } from "../../../contexts/QuillContext";
import { debounce } from "./debounce";
import { useUpdateDocContentMutation } from "../../../redux/apis/fetchData";
import { useDocData } from "../../../contexts/DocContext";
import { useGetSuggestionMutation } from "../../../redux/apis/fetchPythonData";

const UPDATE_DOC = `
mutation docContent( $id: String, $content:String ) {
    updateDocContent( id: $id, content: $content ) {
      id
      content
    }
  }
`

const SUGGESTION = `
mutation Suggest( $userInput: String ) {
	Suggestion(userInput: $userInput) {
    userInput
  }
}`

const Mainscreen: FC = () => {

    const quill = useQuillContext()
    const [ { id, content } ] = useDocData()
    console.log( content )

    useEffect( () => {
        if( !content || !quill ) return
        quill.setContents( JSON.parse( content ) )
    }, [ quill, content ] )

    useEffect( () => {
        if( !quill ) return 
        /**
         * @param Inline 
         * @implements font weights,  
         */

        let Inline = Quill.import( 'blots/inline' )

        class BoldBlot extends Inline {}
        BoldBlot.blotName = 'bold';
        BoldBlot.tagName = 'b';
    
        Quill.register( BoldBlot )

        class RegularBlot extends Inline {}
        RegularBlot.blotName = 'regular';
        RegularBlot.tagName = 'p';
    
        Quill.register( RegularBlot )

        class ItalicBlot extends Inline {}
        ItalicBlot.blotName = 'italic';
        ItalicBlot.tagName = 'i';
    
        Quill.register( ItalicBlot )
        
        /**
         * @param Font 
         * @implements font families,
         *   
         * in order to add another family 
         * define a css class 
         * @example .ql-font-[FontName] 
         */

        let Font = Quill.import('formats/font');

        Font.whitelist = [
            'inconsolata', 
            'roboto', 
            'lato', 
            'arial',
            'Poppins'
        ];
        
        class FontBlot extends Inline {}
        FontBlot.blotName = 'font';
        FontBlot.tagName = 'p';

        Quill.register( FontBlot )
        Quill.register( Font )

        /**
         * @param Size 
         * @implements font sizes, 
         */

        let Size = Quill.import( 'attributors/style/size' )

        Size.whitelist = [
            '10px', 
            '11px',
            '12px',
            '13px',
            '14px',
            '16px',
            '20px',
            '24px',
            '32px',
            '36px',
            '40px',
            '64px',
            '96px'
        ]

        class SizeBlot extends Inline {}
        SizeBlot.blotName = 'size'
        SizeBlot.tagName = 'p'

        Quill.register( SizeBlot )
        Quill.register( Size, true )

        let Align = Quill.import( 'attributors/style/align' )

        Align.whitelist = [
            'center',
            'left',
            'right',
            'justify'
        ]

        let Block = Quill.import( 'blots/block' )

        class AlignBlot extends Block {}
        AlignBlot.blotName = 'align'
        AlignBlot.tagName = 'p'

        Quill.register( AlignBlot )
        Quill.register( Align, true )
    }, [ quill ] ) 
    
    const [ newSuggestion, { data, isLoading } ] = useGetSuggestionMutation()

    useEffect( () => {
        if( !quill ) return
        window.onkeydown = e => {
            if( e.ctrlKey && e.key === " " ) {
                newSuggestion( {
                    body: SUGGESTION,
                    variables: {
                        userInput: 'hank hill'
                    }
                } )
            }
            console.log( data, isLoading )
        } 
    } )

    const [ setUpdateDocContent ] = useUpdateDocContentMutation()

    const e = debounce( ( args: any, id: any ) => {
        
        if( !id ) return

        const data = JSON.stringify( args )
        console.log( data, id )

        setUpdateDocContent( {
            body: UPDATE_DOC,
            variables: {
                id: id!,
                content: data
            }
        } )
    }, 1000 )
    const v = useCallback(e, [])

    useEffect( () => {
        const doc = document.getElementsByClassName( 'ql-editor' )
        if( !doc || !quill ) return 
        quill.on( 'text-change', () => v( quill?.getContents()?.ops, id ))
    } )

    return (
        <div 
            id="main-doc" 
            className={ styles.main_doc }
            unselectable={ "on" }
        >

        </div>
    )
}

export default Mainscreen