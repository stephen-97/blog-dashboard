import React, {useCallback,  useState} from "react";
import styled from "styled-components";
import {TToggleButton} from "../../utils/config";

const StyledToggleButton = styled.div<{$selectedButton: number; $nbOfButtons: number}>`
  ul {
    position: relative;
    height: 3rem;
    display: grid;
    grid-template-columns: repeat(${props => props.$nbOfButtons }, 1fr);
    width: fit-content;
    border: 0.2rem solid #38404e;
    border-radius: var(--border-radius);
    background: #38404e;
    font-weight: bold;
    color: #38404e;
    cursor: pointer;
    font-size: 1.1rem;
  }
  ul::before {
    content: '';
    position: absolute;
    width: ${props => `${(1/props.$nbOfButtons)*100}%`};
    height: 100%;
    left: ${ props => `${props.$selectedButton * ((1/props.$nbOfButtons)*100)}%`};
    background: white;
    border-radius: var(--border-radius);
    transition: all 0.3s;
  }
  ul button {
    padding: 6px;
    text-align: center;
    z-index: 1;
  }
  ul button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
  }
  button {
    height: 100%;
    color: white;
  }
  .selected {
    color: #343434 !important;
  }
`;


interface StyledToggleButtonProps extends React.HTMLProps<HTMLInputElement> {
    buttons: TToggleButton[];

}
const ToggleButton = ({ buttons,...rest}: StyledToggleButtonProps) => {

    const [selectedButton, setSelectedButton] = useState(0);

    const onClick = useCallback((i: number) => {
        setSelectedButton(i);
        buttons[i].callBack();
    }, [buttons])

    return (
        <StyledToggleButton $selectedButton={selectedButton} $nbOfButtons={buttons.length}>
            <ul >
                {buttons.map(({title}, i) =>
                    <button key={i} onClick={() => onClick(i)} className={selectedButton === i ? 'selected' : ''} >{title}</button>
                )}
            </ul>
        </StyledToggleButton>
    )
}

export default ToggleButton;
