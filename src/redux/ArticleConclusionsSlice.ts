import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TArticleConclusion = {
    conclusionText: string,
    conclusionGoodPoints: string[],
    conclusionBadPoints: string[],
}

const initialState: TArticleConclusion = {conclusionText: '', conclusionGoodPoints: [], conclusionBadPoints: [] }
export const ArticleConclusionSlice = createSlice({
    name: 'mainImage',
    initialState,
    reducers: {
        onChangeConclusion: (state: TArticleConclusion, action: PayloadAction<{ articleConclusion: TArticleConclusion}>) => {
            return action.payload.articleConclusion
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    onChangeConclusion,
} = ArticleConclusionSlice.actions

export default ArticleConclusionSlice.reducer