import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TArticleTextImage, TArticleMultipleImages} from "../utils/config";
import {TArticleContent} from "../utils/config";

const initialState: TArticleContent[] = [{type: 'TextImage', paragraph: '', images: ["","",""], title: ""}]

export const ArticleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        update: (state: TArticleContent[], action: PayloadAction<{ article: TArticleContent[]}>) => action.payload.article,
        addBlockTextImage: (state: TArticleContent[]) => [...state,  {type: 'TextImage',index: state.length+1,paragraph: '', images: ["", "", ""], title: ""}],
        addBlockMultipleImages: (state: TArticleContent[]) => [...state, {type: 'MultipleImages',index: state.length+1, images: [""], title: ""}],

        onChangeTextImage: (state: TArticleContent[], action: PayloadAction<{ textImage: TArticleTextImage, index: number }>) =>
            state.map((e: TArticleContent, i: number) => {
                if(i === action.payload.index) {
                    return action.payload.textImage
                }
                return e
            })
        ,
        removeBlock: (state: TArticleContent[], action: PayloadAction<{index: number}>) => state.filter((e, i) => i !== action.payload.index),

    },
})

export const {
    update,
    addBlockTextImage,
    addBlockMultipleImages,
    onChangeTextImage,
    removeBlock,
} = ArticleSlice.actions

export default ArticleSlice.reducer