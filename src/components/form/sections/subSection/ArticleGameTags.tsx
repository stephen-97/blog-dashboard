import React, { useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../../redux/store";
import {add, remove} from "../../../../redux/ArticleGameTagsSlice";
import InputAddTextItems from "../../inputs/InputAddTextItems";
import Tag from "../../buttons/Tag";

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
            <InputAddTextItems
                handlePressKeyDown={handleKeyPressAddTag}
                adding={addGameTag}
                itemTagsState={{state: tag, set: setTag}}
                label={label}
            />
            <ul>
                {articleGameTagsData.map((tagItem, i) =>
                    <li key={i}>
                        <Tag label={tagItem} remove={() => removeGameTag(tagItem)} />
                    </li>
                )}
            </ul>
        </StyledGameTags>
    )
}

export default React.memo(ArticleGameTags);

