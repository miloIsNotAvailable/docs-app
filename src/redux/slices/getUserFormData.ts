import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserDataType } from "../../interfaces/redux/reduxInterfaces";

const initialState: getUserDataType = {
    email: "",
    password: "",
    username: ""
}

const getUserFormData = createSlice( {
    name: 'getUserData', 
    initialState,
    reducers: {
        setEmail: ( 
            state: Partial<getUserDataType>, 
            action: PayloadAction<Partial<getUserDataType>> 
            ) => {
                
                state.email = action.payload.email
            },
        setPassword: ( 
            state: getUserDataType, 
            action: PayloadAction<getUserDataType> 
            ) => {
                
                state.password = action.payload.password
            },
        },   
    } 
)

export const { setEmail, setPassword } = getUserFormData.actions
export default getUserFormData.reducer