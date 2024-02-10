import React from "react";
import styled, {IStyledComponent} from "styled-components";

const StyledArticlePreview: IStyledComponent<any> = styled.section`
  
`;

interface StyledInputProps extends React.HTMLProps<HTMLInputElement> {

}
const ArticlePreview = ({...rest}: StyledInputProps) => {

    return (
        <StyledArticlePreview>
            <span>test</span>
        </StyledArticlePreview>
    )
}

export default ArticlePreview;
