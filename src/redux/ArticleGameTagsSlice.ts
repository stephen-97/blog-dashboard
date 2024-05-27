import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const GameTagsSlice = createSlice({
    name: 'articleGameTags',
    initialState: [] as string[],
    reducers: {
        add: (state: string[], action: PayloadAction<{ tag: string}>) => {
            if(!state.includes(action.payload.tag))
                return [...state, action.payload.tag];
            return state;
        },
        remove: (state: string[], action: PayloadAction<{ tag: string}>) => {
            if(state.includes(action.payload.tag))
                return state.filter((elem) => elem !== action.payload.tag);
            return state;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    add,
    remove
} = GameTagsSlice.actions

export default GameTagsSlice.reducer