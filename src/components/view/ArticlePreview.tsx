import React, {useMemo} from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {articleFunctions} from "../../utils/functions";

const StyledArticlePreview: IStyledComponent<any> = styled.section`
  background-color: darkgray;
  display: block;
  width: min(60rem, 100%);
  padding: 0.5rem 0;
  
  h1 {
    text-transform: uppercase;
    font-size: var(--h1);
    margin-bottom: 2rem;
  }
  h3 {
    font-size: var(--h3);
    margin-bottom: 1rem;
  }
  
  > * {
    width: 100%;
    flex: 1;
    display: block;
  }

  #no-paragraph-informative {
    font-size: 1.8rem;
    text-transform: uppercase;
    color: var(--dark-blue)
  }
  .image-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .capsule-image {
      overflow: hidden;
      padding: 0 0.3rem;
      img {
        width: 100%;
        border-radius: var(--border-radius);
      }
    }
  }


  li:first-child:nth-last-child(1),
  li:first-child:nth-last-child(1) ~ li {
    width: 100%;
  }

  li:first-child:nth-last-child(2),
  li:first-child:nth-last-child(2) ~ li {
    width: 50%;
  }
  
  li:first-child:nth-last-child(3),
  li:first-child:nth-last-child(3) ~ li {
    width: 33.333%;
  }
  
`;

interface StyledInputProps extends React.HTMLProps<HTMLInputElement> {

}
const ArticlePreview = ({...rest}: StyledInputProps) => {
    const paragraphData = useAppSelector((state) => state.article)
    const title = useAppSelector((state) => state.articleTitle)


    const convertParagraphData: string[][] = useMemo(() =>
        paragraphData.map((e,i) => e.paragraph.split('\n'))
    , [paragraphData])

    const renderParagraph = (indexBlock: number, indexParagraph: number, block: string[], paragraph: string) => {
        if(indexParagraph === block.length - 1) {
            return (
                <React.Fragment key={indexBlock * block.length + indexParagraph}>
                    <h3>{paragraphData[indexBlock].title}</h3>
                    <p>{paragraph}</p>
                    {articleFunctions.dataImageIsNotEmpty(paragraphData[indexBlock].images) &&
                        <ul className={"image-container"}>
                            {paragraphData[indexBlock].images.map((e, i) =>
                                e.length > 0 &&
                                    <li key={i} className={"capsule-image"}>
                                        <img alt={""} src={paragraphData[indexBlock].images[i]}/>
                                    </li>
                            )}
                        </ul>
                    }
                </React.Fragment>
            )
        }
        return <p key={indexBlock * block.length + indexParagraph}>{paragraph}</p>
    }


    return (
        <StyledArticlePreview>
            <h1>{title}</h1>
            {convertParagraphData[0][0].length > 0 || paragraphData[0].images.reduce((acc, elem) => acc + elem.length, 0) > 0 ?
                 convertParagraphData.map((block, i) =>
                    block.map((paragraph, j) => renderParagraph(i, j, block, paragraph))
                )
                :
                <div id={"no-paragraph-informative"}>Aucuns paragraphe remplis</div>
            }
        </StyledArticlePreview>
    )
}

export default ArticlePreview;


/**
 * import React, {useMemo} from "react";
 * import styled, {IStyledComponent} from "styled-components";
 * import {useAppDispatch, useAppSelector} from "../../redux/store";
 * import {articleFunctions} from "../../utils/functions";
 *
 * const StyledArticlePreview: IStyledComponent<any> = styled.section`
 *   background-color: darkgray;
 *   width: 100%;
 *
 *   .image-container {
 *     display: flex;
 *     flex-direction: row;
 *     justify-content: space-between;
 *     .capsule-image {
 *       max-height: 23rem;
 *       width: 50%;
 *       img {
 *         height: 100%;
 *         width: 100%;
 *       }
 *     }
 *   }
 * `;
 *
 * interface StyledInputProps extends React.HTMLProps<HTMLInputElement> {
 *
 * }
 * const ArticlePreview = ({...rest}: StyledInputProps) => {
 *     const paragraphData = useAppSelector((state) => state.article)
 *
 *     const convertParagraphData: string[][] = useMemo(() =>
 *         paragraphData.map((e,i) => e.paragraph.split('\n'))
 *     , [paragraphData])
 *
 *     const renderParagraph = (indexBlock: number, indexParagraph: number, block: string[], paragraph: string) => {
 *         if(indexParagraph === block.length - 1) {
 *             return (
 *                 <React.Fragment key={indexBlock * block.length + indexParagraph}>
 *                     <p>{paragraph}</p>
 *                     {articleFunctions.dataImageIsNotEmpty(paragraphData[indexBlock].images) &&
 *                         <div className={"image-container"}>
 *                             {paragraphData[indexBlock].images.map((e, i) =>
 *                                 <div className={"capsule-image"}>
 *                                     <img key={i} alt={""} src={paragraphData[indexBlock].images[i]}/>
 *                                 </div>
 *                             )}
 *                         </div>
 *                     }
 *                 </React.Fragment>
 *             )
 *         }
 *         return <p key={indexBlock * block.length + indexParagraph}>{paragraph}</p>
 *     }
 *
 *     return (
 *         <StyledArticlePreview>
 *             {convertParagraphData.length > 0 &&
 *              convertParagraphData.map((block, i) =>
 *                 block.map((paragraph, j) => renderParagraph(i, j, block, paragraph))
 *             )}
 *         </StyledArticlePreview>
 *     )
 * }
 *
 * export default ArticlePreview;
 */