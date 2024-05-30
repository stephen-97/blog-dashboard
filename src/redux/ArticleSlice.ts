import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TArticleTextImage, TArticleMultipleImages} from "../utils/config";

type TArticleContent = TArticleMultipleImages & TArticleTextImage;

export const ArticleSlice = createSlice({
    name: 'article',
    initialState: [{type: 'TextImage', index: 1, paragraph: '', images: ["","",""], title: ""}],
    reducers: {
        update: (state: TArticleContent[], action: PayloadAction<{ article: TArticleContent[]}>) => action.payload.article,
        addBlockTextImage: (state: TArticleContent[]) => [...state,  {type: 'TextImage',index: state.length+1,paragraph: '', images: ["", "", ""], title: ""}],
        addBlockMultipleImages: (state: TArticleContent[]) => [...state,  {type: 'TextImage',index: state.length+1, images: [""], title: ""}],

        onChangeTitle: (state: TArticleContent[], action: PayloadAction<{title: string, index: number}>) => {
            state.map((e: TArticleContent, i: number) => {
                if (i === action.payload.index) {
                    e['title'] = action.payload.title;
                    return e;
                }
                return e;
            })
        },
        onChangeParagraph: (state: TArticleContent[], action: PayloadAction<{text: string, index: number}>) => {
            state.map((e: TArticleContent, i: number) => {
                if (i === action.payload.index) {
                    e['paragraph'] = action.payload.text;
                    return e;
                }
                return e;
            })
        },
        removeBlock: (state: TArticleContent[], action: PayloadAction<{index: number}>) => state.filter((e, i) => i !== action.payload.index),
        addNewImage: (state: TArticleContent[], action: PayloadAction<{indexParagraph: number, indexImage: number, base64: string}>) => {
            state.map((e: TArticleContent, i) => {
                if(action.payload.indexParagraph === i) {
                    const newImageTab = e.images.map((e: string, i: number) => action.payload.indexImage === i ? action.payload.base64 : e);
                    let newParagraphObject = e;
                    newParagraphObject['images'] = newImageTab;
                    return newParagraphObject
                }
                return e
            })
        },
        removeImage: (state: TArticleContent[], action: PayloadAction<{indexImage: number, indexParagraph: number}>) => {
            state.map((e: TArticleContent,i) =>  {
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
    addBlockTextImage,
    onChangeTitle,
    onChangeParagraph,
    addNewImage,
    removeBlock,
    removeImage
} = ArticleSlice.actions

export default ArticleSlice.reducer