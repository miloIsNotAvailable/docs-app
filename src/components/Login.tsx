import { FC, useEffect } from "react";
import { useGetAllPostsQuery } from "../redux/apis/fetchData";

const Login: FC = () => {

    const { data, isLoading } = useGetAllPostsQuery( {
        body: `query hey{
                hello
            }`,
        variables: undefined
    } )
    console.log( data )
    // useEffect( () => {
    //     fetch( 'api/graphql', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify( { query: `query hey{
    //             hello
    //           }` } )
    //     } ).then( v => v.json() ).then( console.log )
    // }, [] )

    return (
        <div>
            hello
        </div>
    )
}

export default Login