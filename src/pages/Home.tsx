import React from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";

const StyledHome: IStyledComponent<any>  = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  
  
  @media (max-width: 480px) {
    font-size: var(--fz-lg);
  }
`;

const Home = () => {

    return(
        <StyledHome>
            <Header />
            <div>Hey</div>
        </StyledHome>
    )
}


export default Home;