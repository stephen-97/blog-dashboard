import { configureStore} from "@reduxjs/toolkit";
import ArticleReducer from './ArticleSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import ArticleTitleSlice from "./ArticleTitleSlice";
import ArticleMainImagesSlice from "./ArticleMainImages";
import ArticleThemes from "./ArticleThemesSlice";
import ArticleGameTagsSlice from "./ArticleGameTagsSlice";
import ArticleConclusionSlice from "./ArticleConclusionsSlice";

const store =configureStore({
    reducer: {
        article: ArticleReducer,
        articleTitle: ArticleTitleSlice,
        articleMainImages: ArticleMainImagesSlice,
        articleThemes: ArticleThemes,
        articleGameTags: ArticleGameTagsSlice,
        articleConclusion: ArticleConclusionSlice,
    },

})

export const useAppDispatch:() => typeof store.dispatch=useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;