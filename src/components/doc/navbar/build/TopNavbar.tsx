import { FC } from "react";
import { styles } from "../../build/DocStyles";

const TopNavbar: FC = () => {
    
    const arr = [ 'file', 'edit', 'view', 'format' ]

    return (
        <div className={ styles.top_navbar_wrap }>
            {
                arr.map( n => (
                    <div className={ styles.top_navbar }>
                        { n }
                    </div>
                ) ) 
            }
        </div>
    )
}

export default TopNavbar