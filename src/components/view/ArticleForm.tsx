import React, {ChangeEvent} from "react";
import styled, {IStyledComponent} from "styled-components";
import InputTextDefault from "../form/inputs/InputTextDefault";
import Tags from "../form/Tags";
import BlocksListContainer from "../blocks/sections/BlocksListContainer";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {onChangeArticleTitle} from "../../redux/ArticleTitleSlice";
import MainImage from "../form/MainImage";
import SubmitButton from "../form/buttons/SubmitButton";
import ArticleGameTags from "../form/ArticleGameTags";
import ArticleThemes from "../form/ArticleThemes";
import ArticleConclusion from "../form/ArticleConclusion";

const StyledArticleForm: IStyledComponent<any> = styled.section`
    min-width: 100%;
    flex: 1;

    .form-item {
        margin-bottom: 2rem;

        .form-section-container {
            background-color: #282c34;
            border-radius: var(--border-radius);
            padding: 1.5rem;
        }
    }
`;

interface StyledArticleForm extends React.HTMLProps<HTMLElement> {

}

const ArticleForm = ({...rest}: StyledArticleForm) => {

    const dispatch = useAppDispatch()
    const title = useAppSelector((state) => state.articleTitle)

    return (
        <StyledArticleForm>
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
            <BlocksListContainer
                label={"Liste des blocks"}
                className={'form-item'}
            />
            <ArticleConclusion
                label={'Conclusion'}
                className={'form-item'}
            />
            <SubmitButton
                value={'Soumettre'}
                type={'submit'}
                title={'Soumettre '}
            />
        </StyledArticleForm>
    )
}

export default React.memo(ArticleForm);
