import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IHeaderState } from "../Type/Interfaces"

const initialState: IHeaderState = {
    isToggled: false,
    isDark:false,
}

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        toggle: (state) => {
        state.isToggled=!state.isToggled;
    },
    theme:(state)=>{
        state.isDark = !state.isDark;
    },
    setTheme:(state,action: PayloadAction<boolean>) => {
        state.isDark=action.payload;
    },
    setToggle: (state, action: PayloadAction<boolean>) => {
        state.isToggled=action.payload;
    },
}
})

export const { toggle, setToggle,theme ,setTheme} = headerSlice.actions;
export default headerSlice.reducer;

