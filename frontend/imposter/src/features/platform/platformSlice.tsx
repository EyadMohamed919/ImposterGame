import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface platform{
    color:string | null
}

const storedPlatform = sessionStorage.getItem("platform");

const initialState: platform = storedPlatform ? JSON.parse(storedPlatform) : { color: null };

export const PlatformSlice = createSlice({
    name:"platform",
    initialState: initialState,
    reducers:{
        attachPlatform: (state, action: PayloadAction<platform>)=>{
            state.color = action.payload.color;
            localStorage.setItem("player", JSON.stringify(action.payload));
        },
        detachPlatform: (state) => {
            state.color = null
            sessionStorage.removeItem("platform");
        }
    }
});

export const { attachPlatform, detachPlatform } = PlatformSlice.actions;
export default PlatformSlice.reducer;