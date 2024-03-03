import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const ArticleTitleSlice = createSlice({
    name: 'tags',
    initialState: "",
    reducers: {
        onChangeArticleTitle: (state: string, action: PayloadAction<{ title: string}>) =>action.payload.title,
    },
})

// Action creators are generated for each case reducer function
export const {
    onChangeArticleTitle,
} = ArticleTitleSlice.actions

export default ArticleTitleSlice.reducer