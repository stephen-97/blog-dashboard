import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TAritcleContent} from "../utils/config";

export const ArticleSlice = createSlice({
    name: 'article',
    initialState: [{index: 1, paragraph: '', images: ["","",""], title: ""}],
    reducers: {
        update: (state: TAritcleContent[], action: PayloadAction<{ article: TAritcleContent[]}>) => action.payload.article,
        addBlock: (state: TAritcleContent[]) => [...state,  {index: state.length+1,paragraph: '', images: ["", "", ""], title: ""}],
        onChangeTitle: (state: TAritcleContent[], action: PayloadAction<{title: string, index: number}>) => {
            state.map((e: TAritcleContent, i: number) => {
                if (i === action.payload.index) {
                    e['title'] = action.payload.title;
                    return e;
                }
                return e;
            })
        },
        onChangeParagraph: (state: TAritcleContent[], action: PayloadAction<{text: string, index: number}>) => {
            state.map((e: TAritcleContent, i: number) => {
                if (i === action.payload.index) {
                    e['paragraph'] = action.payload.text;
                    return e;
                }
                return e;
            })
        },
        removeBlock: (state: TAritcleContent[], action: PayloadAction<{index: number}>) => state.filter((e, i) => i !== action.payload.index),
        addNewImage: (state: TAritcleContent[], action: PayloadAction<{indexParagraph: number, indexImage: number, base64: string}>) => {
            state.map((e: TAritcleContent, i) => {
                if(action.payload.indexParagraph === i) {
                    const newImageTab = e.images.map((e: string, i: number) => action.payload.indexImage === i ? action.payload.base64 : e);
                    let newParagraphObject = e;
                    newParagraphObject['images'] = newImageTab;
                    return newParagraphObject
                }
                return e
            })
        },
        removeImage: (state: TAritcleContent[], action: PayloadAction<{indexImage: number, indexParagraph: number}>) => {
            state.map((e: TAritcleContent,i) =>  {
                if(action.payload.indexParagraph === i) {
                    const newImageTab = e.images.map((e: string, i: number) => action.payload.indexImage === i ? '' : e);
                    let newParagraphObject = e;
                    newParagraphObject['images'] = newImageTab;
                    return newParagraphObject;
                }
                return e;
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    update,
    addBlock,
    onChangeTitle,
    onChangeParagraph,
    addNewImage,
    removeBlock,
    removeImage
} = ArticleSlice.actions

export default ArticleSlice.reducer