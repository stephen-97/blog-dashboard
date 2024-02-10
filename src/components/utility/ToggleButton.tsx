import React from "react";
import styled, {IStyledComponent} from "styled-components";

const StyledToggleButton: IStyledComponent<any> = styled.div`
  label {
    position: relative;
    height: 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: fit-content;
    border: 0.2rem solid #38404e;
    border-radius: var(--border-radius);
    background: #38404e;
    font-weight: bold;
    color: #38404e;
    cursor: pointer;
  }
  label::before {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    background: white;
    border-radius: var(--border-radius);
    transition: all 0.3s;
  }
  input {
    margin: 0;
    padding: 0;
  }
  input:checked + label::before {
    left: 50%;
  }
  label div {
    padding: 6px;
    text-align: center;
    z-index: 1;
  }
  input {
    display: block;
    visibility: hidden;
  }
  input:checked + label div:first-child{
    color: white;
    transition: color 0.3s;
  }
  input:checked + label div:last-child{
    color: #343434;
    transition: color 0.3s;
  }
  input + label div:first-child{
    color: #343434;
    transition: color 0.3s;
  }
  input + label div:last-child{
    color: white;
    transition: color 0.3s;
  }
  label div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
  }
`;

interface StyledToggleButtonProps extends React.HTMLProps<HTMLInputElement> {

}
const ToggleButton = ({...rest}: StyledToggleButtonProps) => {

    return (
        <StyledToggleButton>
            <input type="checkbox" id="toggle" {...rest}/>
            <label htmlFor={"toggle"}>
                <div>Formulaire</div>
                <div>Aperçu</div>
            </label>
        </StyledToggleButton>
    )
}

export default ToggleButton;
