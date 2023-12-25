import React from "react";
import styled, {IStyledComponent} from "styled-components";
import {routesItem} from "../utils/config";

const StyledHeader: IStyledComponent<any>  = styled.header`
  display: grid;
  grid-template-rows: 12% 88%;
  height: 100vh;
  width: 220px;
  background-color: var(--dark-blue);
  margin: 0;

  #title-container {
    display: flex;
    align-items: center;
    h2 {
      padding: 0 0 0 15px;
      margin: 0;
      color: whitesmoke;
    }
  }
  .header-item {
    padding: 0.8rem 0 0.8rem 15px;
    font-size: 1.2rem;
    color: whitesmoke;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    height: 80px;
    width: 100vw;
  }
  
`;
const Header = () => {



    return(
        <StyledHeader>
            <section id={'title-container'}>
                <h2 id={'dashboard-Title'}>Dashboard</h2>
            </section>
            <ul>
                {routesItem.map((elem, index) =>
                    <li>
                        <div className={'header-item'}>{elem.itemName}</div>
                        <div className={'line'}></div>
                    </li>
                )}
            </ul>
        </StyledHeader>
    )
}


export default Header;