import React from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";
import StyledPage from "../styles/PageStyle";

const StyledCreateArticle: IStyledComponent<any>  = styled.div`
  height: 100vh;
  width: 100vw;
  
  @media (max-width: ${props => props.theme.responsiveValue}) {
    font-size: var(--fz-lg);
  }
`;

const CreateArticle = () => {

    return(
        <StyledPage>
            <Header />
            <div>HEY</div>
        </StyledPage>
    )
}


export default CreateArticle;