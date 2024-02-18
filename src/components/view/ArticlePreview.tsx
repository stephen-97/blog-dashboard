import React, {useMemo} from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";

const StyledArticlePreview: IStyledComponent<any> = styled.section`
  
`;

interface StyledInputProps extends React.HTMLProps<HTMLInputElement> {

}
const ArticlePreview = ({...rest}: StyledInputProps) => {
    const paragraphData = useAppSelector((state) => state.article)

    const convertParagraphData: string[][] = useMemo(() =>
        paragraphData.map((e,i) => e.paragraph.split('\n'))
    , [paragraphData])


    return (
        <StyledArticlePreview>
            {convertParagraphData.map((block, i) =>
                block.map((paragraph, j) => {
                        if(j === block.length - 1) {
                            return(
                                <div key={i + block.length + j}>
                                    <p>{paragraph}</p>
                                    <img alt={""} src={paragraphData[i].images[0]}/>
                                </div>
                            )
                        }
                        return (
                            <div key={i + block.length + j}>
                                <p>{paragraph}</p>
                            </div>
                        )
                    }
                )
            )}
        </StyledArticlePreview>
    )
}

export default ArticlePreview;
