import {styled} from "styled-components";

const StyledPage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  background-color: ${props => props.theme.secondaryColor};
  
  main{
    padding: 1rem;
    margin-left: ${props => props.theme.dashboard_menu_desktop_width}
  }

  @media (max-width: ${props => props.theme.responsiveValue}) {
    font-size: var(--fz-lg);
    flex-direction: column;
    
    main {
      margin-left: 0;
    }
  }
`;

export default StyledPage