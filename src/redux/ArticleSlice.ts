import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TAritcleContent} from "../utils/config";
import {ChangeEvent} from "react";

export const ArticleSlice = createSlice({
    name: 'article',
    initialState: [{paragraph: '', images: ["","",""]}],
    reducers: {
        update: (state: TAritcleContent[], action: PayloadAction<{ article: TAritcleContent[]}>) => action.payload.article,
        addParagraph: (state: TAritcleContent[]) => [...state,  {paragraph: '', images: ["", "", ""]}],
        addingTextToParagraph: (state: TAritcleContent[], action: PayloadAction<{text: string, index: number}>) => {
            state.map((e: TAritcleContent, i: number) => {
                if (i === action.payload.index) {
                    e['paragraph'] = action.payload.text;
                    return e;
                }
                return e;
            })
        },
        removeParagraph: (state: TAritcleContent[], action: PayloadAction<{index: number}>) => state.slice(action.payload.index),
        addNewImage: (state: TAritcleContent[], action: PayloadAction<{indexParagraph: number, indexImage: number, base64: string}>) => {
            state.map((e,i) => {
                if(action.payload.indexParagraph === i) {
                    const newImageTab = e.images.map((e: string, i: number) => action.payload.indexImage === i ? action.payload.base64 : e);
                    let newParagraphObject = e;
                    newParagraphObject['images'] = newImageTab;
                    return newParagraphObject
                }
                return e
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    update,
    addParagraph,
    addingTextToParagraph,
    addNewImage,
    removeParagraph } = ArticleSlice.actions

export default ArticleSlice.reducer