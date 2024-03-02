import React from "react";
import styled, {IStyledComponent} from "styled-components";
import Input from "../form/Input";
import Tags from "../form/Tags";
import BlockList from "../form/BlockList";

const StyledArticleForm: IStyledComponent<any> = styled.section`
  min-width: 100%;
  flex: 1;
  
  .input-title {
    width: 50%;
  }
  .form-item {
    margin-bottom: 2rem;
  }
`;

interface StyledArticleForm extends React.HTMLProps<HTMLElement> {

}
const ArticleForm = ({...rest}: StyledArticleForm) => {


    return (
        <StyledArticleForm>
                <Input
                    label={"Titre de l'article"}
                    placeholder={"Titre de l'article"}
                    className={'input-title form-item'}
                />
                <Tags
                    label={'Types de jeux'}
                    className={'form-item'}
                />
                <BlockList label={"Liste des paragraphes"}/>
        </StyledArticleForm>
    )
}

export default ArticleForm;
