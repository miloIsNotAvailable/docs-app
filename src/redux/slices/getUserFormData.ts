import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserDataType } from "../../interfaces/redux/reduxInterfaces";

const initialState: Partial<getUserDataType> = {
    email: undefined,
    password: undefined,
    username: undefined
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
            state: Partial<getUserDataType>, 
            action: PayloadAction<Partial<getUserDataType>> 
            ) => {
                
                state.password = action.payload.password
            },
        setUsername: ( 
            state: Partial<getUserDataType>, 
            action: PayloadAction<Partial<getUserDataType>> 
            ) => {
                
                state.username = action.payload.username
            },
        },   
    } 
)

export const { setEmail, setPassword, setUsername } = getUserFormData.actions
export default getUserFormData.reducer