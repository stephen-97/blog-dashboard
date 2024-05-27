import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const ThemesSlice = createSlice({
    name: 'articleThemes',
    initialState: [] as string[],
    reducers: {
        add: (state: string[], action: PayloadAction<{ theme: string}>) => {
            if(!state.includes(action.payload.theme))
                return [...state, action.payload.theme];
            return state;
        },
        remove: (state: string[], action: PayloadAction<{ theme: string}>) => {
            if(state.includes(action.payload.theme))
                return state.filter((elem) => elem !== action.payload.theme);
            return state;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    add,
    remove
} = ThemesSlice.actions

export default ThemesSlice.reducer