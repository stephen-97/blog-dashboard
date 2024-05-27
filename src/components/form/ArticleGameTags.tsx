import React, {useCallback, useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {toggle} from "../../redux/TagsSlice";
import {add, remove} from "../../redux/ArticleGameTagsSlice";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";

const StyledGameTags: IStyledComponent<any> = styled.div`
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

interface GameTagsProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}
const ArticleGameTags = ({label, ...props}: GameTagsProps) => {

    const articleGameTagsData = useAppSelector((state) => state.articleGameTags)
    const dispatch = useAppDispatch()

    //onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(onChangeParagraph({text :e.target.value, index: i})) }

    const [tag, setTag] = useState<string>('');

    const addGameTag = () => {
        if(tag.length > 0 && !articleGameTagsData.includes(tag)) {
            dispatch(add({ tag: tag}));
            setTag('')
        }
    };

    const removeGameTag = (selectedTag: string) => {
        if(articleGameTagsData.includes(selectedTag)) {
            dispatch(remove({ tag: selectedTag}));
        }
    };

    const handleKeyPressAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && tag.length > 0 && !articleGameTagsData.includes(tag)) {
            dispatch(add({ tag: tag}));
            setTag('')
        }
    }

    return (
        <StyledGameTags {...props}>
            <label>{label}</label>
            <div className={'input-container'}>
                <input
                    type={'text'}
                    placeholder={'Ajouter un genre'}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={handleKeyPressAddTag}
                    value={tag}
                />
                <button onClick={() => addGameTag()}>
                    <FaPlus size={25} />
                </button>
            </div>
            <ul>
                {articleGameTagsData.map((tagItem, i) =>
                    <li key={i}>
                        <span>{tagItem}</span>
                        <button onClick={() => removeGameTag(tagItem)}>
                            <RxCross2 />
                        </button>
                    </li>
                )}
            </ul>
        </StyledGameTags>
    )
}

export default React.memo(ArticleGameTags);