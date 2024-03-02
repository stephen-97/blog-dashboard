import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const TagsSlice = createSlice({
    name: 'tags',
    initialState: [] as string[],
    reducers: {
        add: (state: string[], action: PayloadAction<{ tag: string}>) => [...state, action.payload.tag],
        remove: (state: string[], action: PayloadAction<{ tag: string}>) => state.filter((elem) => elem !== action.payload.tag),
    },
})

// Action creators are generated for each case reducer function
export const {
    add,
    remove,
} = TagsSlice.actions

export default TagsSlice.reducer