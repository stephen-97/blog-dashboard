import React, {ChangeEvent} from "react";
import styled from "styled-components";
import InputTextDefault from "../inputs/InputTextDefault";
import {onChangeArticleTitle} from "../../../redux/ArticleTitleSlice";
import ArticleGameTags from "./subSection/ArticleGameTags";
import ArticleThemes from "./subSection/ArticleThemes";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import MainImage from "./subSection/MainImage";

const StyledIntro = styled.section`

`;

interface ArticleIntroProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}


const ArticleIntro = ({label, ...props}: ArticleIntroProps) => {

    const title = useAppSelector((state) => state.articleTitle)
    const dispatch = useAppDispatch()

    return (
        <StyledIntro {...props}>
            <label>{label}</label>
            <div className={'form-section-container'}>
                <InputTextDefault
                    label={"Titre de l'article"}
                    placeholder={"Titre de l'article"}
                    className={'form-item'}
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(onChangeArticleTitle({title: e.target.value}))}
                />
                <ArticleGameTags
                    label={'Types de jeux'}
                    className={'form-item'}
                />
                <ArticleThemes
                    label={'Thèmes abordés'}
                    className={'form-item'}
                />
                <MainImage
                    label={"Image principale et secondaire"}
                    className={'form-item'}
                />
            </div>
        </StyledIntro>
    )
}


export default React.memo(ArticleIntro);
