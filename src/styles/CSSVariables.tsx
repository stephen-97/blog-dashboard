import {css, RuleSet} from "styled-components";
import colors from "./colors";

const CSSVariables: RuleSet<object> = css`
    :root {
      --gray: ${colors.gray};
      --light-gray: ${colors.lightGray};
      --white: ${colors.white};
      --dark-blue: ${colors.darkBlue};
      --dark-gray: ${colors.darkGray};
      --blue: ${colors.blue};
      --red: ${colors.red};
      
      --hover: #33333350;
      
      --h1: 30px;
      --h2: 24px;
      
      --responsive-value: 700px;
      --border-radius: 0.8rem;
    }
`;

export default CSSVariables;