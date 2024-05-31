import React from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {toggle} from "../../redux/TagsSlice";

const StyledTags: IStyledComponent<any> = styled.div`
    ul {
      display: flex;
      gap: 1rem;
      button {
        box-sizing: border-box;
        padding: 1rem;
        background-color: var(--dark-gray);
        color: var(--white);
        border-radius: var(--border-radius);
        &:hover,
        &.selected {
          box-shadow:inset 0px 0px 0px 0.2rem var(--dark-blue);
          //border: 0.2rem solid var(--dark-gray);
          background-color: var(--white);
          color: var(--dark-gray)
        }
      }
    }
`;

interface StyledPragraphProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}
const TextArea = ({label, ...props}: StyledPragraphProps) => {

    const tagsData = useAppSelector((state) => state.tags)
    const dispatch = useAppDispatch()

    const tags = ["Aventure", "RPG", "Action", "Stratégie", "MOBA"];

    //onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(onChangeParagraph({text :e.target.value, index: i})) }


    return (
        <StyledTags {...props}>
            <label>{label}</label>
            <ul>
                {tags.map((e, i) =>
                    <li key={i}>
                        <button
                            className={tagsData.includes(e) ? "selected" : ""}
                            onClick={() => dispatch(toggle({tag: e}))}
                        >
                            {e}
                        </button>
                    </li>
                )}
            </ul>
        </StyledTags>
    )
}

export default TextArea;