import { configureStore} from "@reduxjs/toolkit";
import ArticleReducer from './ArticleSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store =configureStore({
    reducer: {
        article: ArticleReducer
    },

})

export const useAppDispatch:() => typeof store.dispatch=useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;