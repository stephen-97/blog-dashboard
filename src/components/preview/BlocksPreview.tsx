import React from 'react';
import styled from "styled-components";
import {TArticleContent, TArticleMultipleImages, TArticleTextImage} from "../../utils/config";

const StyledBlocksPreview = styled.div`

`

const StyledBlockTextImage = styled.div`
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
`

interface IntroArticleProps extends React.HTMLProps<HTMLDivElement> {
    blockData: TArticleContent[]
}


const BlocksPreview = ({blockData}: IntroArticleProps) => {
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

    const renderImageSLider = (indexBlock: number, e: TArticleMultipleImages) => {
        return (
            <div >
              aaa
            </div>
        )
    }

    const renderBlock = (i: number,e: TArticleContent) => {
        if(e.type === 'TextImages') {
            return renderBlockTextImage(i, e as TArticleTextImage)
        }
        if(e.type === 'MultiplesImages') {
            return renderImageSLider(i, e as TArticleMultipleImages)
        }
    }

    return (
        <StyledBlocksPreview>
            {blockData.map((e, i) => renderBlock(i, e))}
        </StyledBlocksPreview>
    );
}

export default React.memo(BlocksPreview);