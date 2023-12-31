import {styled} from "styled-components";

const StyledPage = styled.div`
  background-color: red;
  height: 100vh;
  width: 100vw;
  &:nth-child(2) {
    flex: 1;
  }

  @media (max-width: ${props => props.theme.responsiveValue}) {
    font-size: var(--fz-lg);
  }
`;

export default StyledPage