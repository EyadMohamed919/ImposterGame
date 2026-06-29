import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    name:string,
    
}
export const UserSlice = createSlice({
    name:"user",
    initialState:null,
    reducers: {
        attachPlayer: (state)
    }
})