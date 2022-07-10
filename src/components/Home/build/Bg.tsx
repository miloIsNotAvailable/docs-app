import { FC } from "react";
import { default as BgIcon } from '../../../graphics/BG.svg'
import { styles } from "./HomeStyles";

const Bg: FC = () => {

    return (
        <div className={ styles.bg_wrap }>
            <img src={ BgIcon } alt=""/>
        </div>
    )
}

export default Bg