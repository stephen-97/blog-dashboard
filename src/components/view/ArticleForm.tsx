import React from "react";
import styled from "styled-components";
import BlocksListContainer from "../form/sections/ArticleBlockList";
import SubmitButton from "../form/buttons/SubmitButton";
import ArticleConclusion from "../form/sections/ArticleConclusion";
import ArticleIntro from "../form/sections/AritcleIntro";

const StyledArticleForm = styled.div`
    min-width: 100%;
    flex: 1;

    .form-item {
        margin-bottom: 2rem;

        .form-section-container {
            background-color: #282c34;
            border-radius: var(--border-radius);
            padding: 1.5rem;

            input, label {
                color: var(--white);
            }

            input {
                border-color: var(--white);
            }
            .tag {
                background: var(--white);
                color: var(--dark-gray);
            }
            .rounded-image-button {
                button {
                    background-color: var(--white);
                }
            }
        }
    }
`;

interface StyledArticleFormProps extends React.HTMLProps<HTMLElement> {

}

const ArticleForm = ({...rest}: StyledArticleFormProps) => {
    return (
        <StyledArticleForm>
            <ArticleIntro
                label={'Introduction'}
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
