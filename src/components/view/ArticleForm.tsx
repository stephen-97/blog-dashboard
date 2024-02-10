import React from "react";
import styled, {IStyledComponent} from "styled-components";

const StyledArticleForm: IStyledComponent<any> = styled.section`
  
`;

interface StyledArticleForm extends React.HTMLProps<HTMLElement> {

}
const ArticleForm = ({...rest}: StyledArticleForm) => {

    return (
        <StyledArticleForm>
            <span>test</span>
        </StyledArticleForm>
    )
}

export default ArticleForm;
