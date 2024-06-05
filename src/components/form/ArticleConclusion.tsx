import React from "react";
import styled from "styled-components";


const StyledConclusion = styled.div`
    display: flex;
    flex-direction: column;
`;

interface ArticleConclusionProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}


const ArticleConclusion = ({label}: ArticleConclusionProps) => {


    return(
        <StyledConclusion>
            <label>{label}</label>
            <div>TEs test tes</div>
        </StyledConclusion>
    )
}


export default React.memo(ArticleConclusion);
