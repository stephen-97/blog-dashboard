import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TArticleMainImages = {
    firstMainImage: string,
    secondMainImage: string
}
export const ArticleMainImagesSlice = createSlice({
    name: 'mainImage',
    initialState: {firstMainImage: '', secondMainImage: ''},
    reducers: {
        addNewFirstMainImage: (state: TArticleMainImages, action: PayloadAction<{ base64: string}>) =>  {
            const newObject = state;
            newObject.firstMainImage = action.payload.base64
            return newObject;
        },
        addNewSecondMainImage: (state: TArticleMainImages, action: PayloadAction<{ base64: string}>) => {
            const newObject = state;
            newObject.secondMainImage = action.payload.base64;
            return newObject
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    addNewFirstMainImage,
    addNewSecondMainImage
} = ArticleMainImagesSlice.actions

export default ArticleMainImagesSlice.reducer