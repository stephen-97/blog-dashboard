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
      
      --h1: clamp(2rem, 0.75rem + 4vw, 3rem);
      --h2: 24px;
      --h3: clamp(1.65rem, 1.2125rem + 1.4vw, 2rem);;
      
      --responsive-value: 700px;
      --border-radius: 0.8rem;
    }
`;

export default CSSVariables;