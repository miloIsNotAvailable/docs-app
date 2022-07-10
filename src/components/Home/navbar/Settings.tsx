import { FC } from "react";
import { default as SettingsIcon } from '../../../graphics/Settings.svg'
import { styles } from "./NavbarStyles";

const Settings: FC = () => {

    return (
        <div className={ styles.settings_wrap }>
            <img 
                src={ SettingsIcon } 
                alt=""
                className={ styles.settings_icon }
                tabIndex={ 0 }
            />
        </div>
    )
}
export default Settings