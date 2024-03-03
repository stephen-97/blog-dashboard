import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const TagsSlice = createSlice({
    name: 'tags',
    initialState: [] as string[],
    reducers: {
        toggle: (state: string[], action: PayloadAction<{ tag: string}>) => {
            if(!state.includes(action.payload.tag))
                return [...state, action.payload.tag];
            return state.filter((elem) => elem !== action.payload.tag);
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    toggle,
} = TagsSlice.actions

export default TagsSlice.reducer