import React, {useMemo} from "react";
import styled, {IStyledComponent} from "styled-components";
import { useAppSelector} from "../../redux/store";
import {TArticleTextImage} from "../../utils/config";

const StyledArticlePreview: IStyledComponent<any> = styled.section`
  display: block;
  width: min(60rem, 100%);
  
  
  > * {
    width: 100%;
    flex: 1;
    display: block;
  }

  .text-image-section {
    background-color: darkgray;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    h1 {
      text-transform: uppercase;
      font-size: var(--h1);
      margin-bottom: 2rem;
    }
    h3 {
      font-size: var(--h3);
      margin-bottom: 1rem;
    }
    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      li {
        overflow: hidden;
        padding: 0 0.3rem;
        width: 1px;
        img {
          width: 100%;
          border-radius: var(--border-radius);
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
    }
  }
  
  #no-blocks-section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-weight: bolder;
    color: var(--dark-blue);
    .no-blocks-error-icon {
      height: auto;
      width: 20vw;
    }
  }
`;

interface StyledInputProps extends React.HTMLProps<HTMLInputElement> {

}
const ArticlePreview = ({...rest}: StyledInputProps) => {
    const blockData = useAppSelector((state) => state.article)
    const title = useAppSelector((state) => state.articleTitle)



    const renderBlockTextImage = (indexBlock: number, e: TArticleTextImage) => {
        console.log(e.images[0])
        return (
            <div className={'text-image-section'} key={indexBlock}>
                <h3>{e.title}</h3>
                <p>{e.paragraph}</p>
                {e.images.length > 0 &&
                    <ul>
                        {e.images.filter(base64string => base64string.length > 0).map((image, i) =>
                            <li key={i} className={"capsule-image"}>
                                <img alt={""} src={image}/>
                            </li>
                        )}
                    </ul>
                }
            </div>
        )
    }


    return (
        <StyledArticlePreview>
            <h1>{title}</h1>
            {blockData.map((e, i) => renderBlockTextImage(i, e as TArticleTextImage))}
        </StyledArticlePreview>
    )
}

export default ArticlePreview;

/*
{convertParagraphData[0][0].length > 0 || paragraphData[0].images.reduce((acc, elem) => acc + elem.length, 0) > 0 ?
                <div className={"blocks-section"}>
                    <h1>{title}</h1>

                    {convertParagraphData.map((block, i) =>
                        block.map((paragraph, j) => renderBlock(i, j, block, paragraph))
                    )}
                </div>
                :
                <div id={"no-blocks-section"}>
                    <BiMessageError className={'no-blocks-error-icon'}/>
                    <span>Aucuns contenus de cet article n'a été remplis pour le moment.</span>
                </div>
            }



            const renderBlock = (indexBlock: number, indexParagraph: number, block: string[], paragraph: string) => {

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
 */