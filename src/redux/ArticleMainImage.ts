import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const ArticleMainImageSlice = createSlice({
    name: 'mainImage',
    initialState: "",
    reducers: {
        addNewMainImage: (state: string, action: PayloadAction<{ base64: string}>) =>action.payload.base64,
    },
})

// Action creators are generated for each case reducer function
export const {
    addNewMainImage,
} = ArticleMainImageSlice.actions

export default ArticleMainImageSlice.reducer