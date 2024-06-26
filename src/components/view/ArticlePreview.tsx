import React, {useMemo} from "react";
import styled, {IStyledComponent} from "styled-components";
import {useAppSelector} from "../../redux/store";
import {TArticleTextImage} from "../../utils/config";
import IntroPreview from "../preview/IntroPreview";
import BlocksPreview from "../preview/BlocksPreview";
import ConclusionPreview from "../preview/ConclusionPreview";

const StyledArticlePreview: IStyledComponent<any> = styled.section`
  display: block;
  width: min(60rem, 100%);
  //background-color: darkgray;

  h1 {
    font-size: var(--h1);
  }

  h2 {
    font-size: var(--h2);
  }

  h3 {
    font-size: var(--h3);
  }
  
  p {
    line-height: 2;
  }


  .text-image-section {
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
    const articleTitle = useAppSelector((state) => state.articleTitle);
    const articleMainImages = useAppSelector((state) => state.articleMainImages)
    const articleTags = useAppSelector((state) => state.articleGameTags);
    const articleThemes = useAppSelector((state) => state.articleThemes)
    const articleConclusion = useAppSelector((state) => state.articleConclusion);
    // const title = useAppSelector((state) => state.articleTitle)


    const renderBlockTextImage = (indexBlock: number, e: TArticleTextImage) => {
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

    //const showIntro = (articleMainImages.firstMainImage.length > 0) && (articleTitle.length > 0)
    const showIntro = useMemo(() => (articleMainImages.firstMainImage.length > 0) && (articleTitle.length > 0), [articleMainImages, articleTitle])
    const showBlockData = useMemo(() => blockData.length > 0, [blockData])
    const showConclusion = useMemo(() => articleConclusion.conclusionText.length > 0, [articleConclusion])

    return (
        <StyledArticlePreview>
            {showIntro &&
                <IntroPreview
                    firstImage={articleMainImages.firstMainImage}
                    secondImage={articleMainImages.secondMainImage}
                    tagsList={articleTags}
                    themeList={articleThemes}
                />
            }
            {showBlockData &&
                <BlocksPreview
                    blockData={blockData}
                />
            }
            {showConclusion &&
                <ConclusionPreview/>
            }
        </StyledArticlePreview>
    )
}

export default ArticlePreview;
