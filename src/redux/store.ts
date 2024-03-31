import { configureStore} from "@reduxjs/toolkit";
import ArticleReducer from './ArticleSlice';
import TagsSlice from './TagsSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import ArticleTitleSlice from "./ArticleTitleSlice";
import ArticleMainImageSlice from "./ArticleMainImage";

const store =configureStore({
    reducer: {
        article: ArticleReducer,
        tags: TagsSlice,
        articleTitle: ArticleTitleSlice,
        articleMainImage: ArticleMainImageSlice,
    },

})

export const useAppDispatch:() => typeof store.dispatch=useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;