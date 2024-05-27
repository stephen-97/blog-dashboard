import React, {useCallback, useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {add, remove} from "../../redux/ArticleThemesSlice";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

const StyledArticleThemes: IStyledComponent<any> = styled.div`
  display: flex;
  flex-direction: column;
  
  .input-container {
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
    input {
      height: 4rem;
      width: 100%;
    }
    button {
      position: absolute;
      height: 3rem;
      width: 3rem;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--dark-gray);
      border-radius: var(--border-radius-s);
      svg {
        fill: var(--white);
      }
    }
  }
    ul {
      display: flex;
      gap: 1rem;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--dark-gray);
        color: var(--white);
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius-s);
        button {
          display: flex;
          align-items: end;
        }
        span {
          display: flex;
          padding: 0;
          /:background-color: red;
          vertical-align: center;
          line-height: 0.9;
          justify-content: center;
          align-items: center;
        }
      }
    }
`;

interface ArticleThemesProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}

const ArticleThemes = ({label, ...props}: ArticleThemesProps) => {

    const themesData = useAppSelector((state) => state.articleThemes)
    const dispatch = useAppDispatch()

    const [theme, setTheme] = useState<string>('');

    const addTheme = () => {
        if(theme.length > 0 && !themesData.includes(theme)) {
            dispatch(add({ theme: theme}));
            setTheme('')
        }
    };

    const removeTheme = (selectedTheme: string) => {
        if(themesData.includes(selectedTheme)) {
            dispatch(remove({ theme: selectedTheme}));
        }
    };

    const handleKeyPressAddTheme = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && theme.length > 0 && !themesData.includes(theme)) {
            dispatch(add({ theme: theme}));
            setTheme('')
        }
    }

    return (
        <StyledArticleThemes {...props}>
            <label>{label}</label>
            <div className={'input-container'}>
                <input
                    type={'text'}
                    placeholder={'Ajouter un genre'}
                    onChange={(e) => setTheme(e.target.value)}
                    onKeyDown={handleKeyPressAddTheme}
                    value={theme}
                />
                <button onClick={() => addTheme()}>
                    <FaPlus size={25} />
                </button>
            </div>
            <ul>
                {themesData.map((tagItem, i) =>
                    <li key={i}>
                        <span>{tagItem}</span>
                        <button onClick={() => removeTheme(tagItem)}>
                            <RxCross2 />
                        </button>
                    </li>
                )}
            </ul>
        </StyledArticleThemes>
    )
}

export default React.memo(ArticleThemes);