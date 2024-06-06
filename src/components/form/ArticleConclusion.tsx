import React from "react";
import styled from "styled-components";
import TextArea from "./TextArea";
import InputLabelBorder from "./animatedInputs/InputLabelBorder";
import TextAreaLabelBorder from "./animatedInputs/TextAreaLabelBorder";


const StyledConclusion = styled.div`
    display: flex;
    flex-direction: column;
    
        .conclusion-input {
            height: 15rem;
        }
    
        .form-item {
            margin-bottom: 2remrem;        
        }
`;

interface ArticleConclusionProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}


const ArticleConclusion = ({label, ...rest}: ArticleConclusionProps) => {

//            <TextArea className={'conclusion-input'} title={'Dernière conclusion'} />

    return(
        <StyledConclusion {...rest}>
            <label>{label}</label>
            <InputLabelBorder label={"TEST"} className={'form-item'}/>
            <TextAreaLabelBorder label={"Résumé conclusion"} className={'form-item'}/>
        </StyledConclusion>
    )
}


export default React.memo(ArticleConclusion);
