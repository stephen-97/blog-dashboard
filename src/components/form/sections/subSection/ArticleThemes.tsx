import React, {useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../../redux/store";
import {add, remove} from "../../../../redux/ArticleThemesSlice";
import Tag from "../../buttons/Tag"
import InputAddTextItems from "../../inputs/InputAddTextItems";

const StyledArticleThemes: IStyledComponent<any> = styled.div`
    display: flex;
    flex-direction: column;
    ul {
        display: flex;
        gap: 1rem;
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
        if (theme.length > 0 && !themesData.includes(theme)) {
            dispatch(add({theme: theme}));
            setTheme('')
        }
    };

    const removeTheme = (selectedTheme: string) => {
        if (themesData.includes(selectedTheme)) {
            dispatch(remove({theme: selectedTheme}));
        }
    };

    const handleKeyPressAddTheme = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && theme.length > 0 && !themesData.includes(theme)) {
            dispatch(add({theme: theme}));
            setTheme('')
        }
    }

    return (
        <StyledArticleThemes {...props}>
            <InputAddTextItems
                handlePressKeyDown={handleKeyPressAddTheme}
                adding={addTheme}
                itemTagsState={{state: theme, set: setTheme}}
                label={label}
            />
            <ul>
                {themesData.map((tagItem, i) =>
                    <Tag key={i} label={tagItem} remove={() => removeTheme(tagItem)}/>
                )}
            </ul>
        </StyledArticleThemes>
    )
}

export default React.memo(ArticleThemes);
