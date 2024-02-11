import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TAritcleContent} from "../utils/config";

export const ArticleSlice = createSlice({
    name: 'article',
    initialState: [{paragraph: '', images: ["","",""]}],
    reducers: {
        update: (state: TAritcleContent[], action: PayloadAction<{ article: TAritcleContent[]}>) =>
            action.payload.article,
    },
})

// Action creators are generated for each case reducer function
export const { update } = ArticleSlice.actions

export default ArticleSlice.reducer