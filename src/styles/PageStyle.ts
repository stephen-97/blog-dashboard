import {styled} from "styled-components";

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: ${props => props.theme.secondaryColor};


  main{
    padding: 1rem;
    margin-left: 0 
  }

  @media (max-width: ${props => props.theme.responsiveValue}) {
    font-size: var(--fz-lg);
    flex-direction: column;
    
  }
`;

export default StyledPage