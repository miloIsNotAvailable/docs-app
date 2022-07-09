import { FC } from "react";
import { useGetAllPostsQuery } from "../../../../redux/apis/fetchData";
import { Email, Password, Username } from "../../forms/type";
import Redirect from "../navbar/Redirect";
import Submit from "../navbar/Submit";
import { styles } from "./LoginStyles";
import { motion } from "framer-motion";

const Signup: FC = () => {

    const { data, isLoading } = useGetAllPostsQuery( {
        body: `query hey{
                hello
            }`,
        variables: undefined
    } )
    console.log( data )

    return (
        <motion.div 
            className={ styles.wrap_login }
            initial={ { transform: 'translate(-100%, 0)' } }
            animate={ { transform: 'translate(0%, 0)' } }
            exit={ { transform: 'translate(100%, 0)' } }
        >
            <div className={ styles.login_title }>
                create new account
            </div>
            <div className={ styles.wrap_login_forms }>
                <Email/>
                <Password/>
                <Username/>
            </div>
            <div className={ styles.login_navbar_wrap }>
                <Submit/>
                <Redirect/>
            </div>
        </motion.div>
    )
}

export default Signup