import React from 'react';
import styled from "styled-components";
import {TArticleTextImage} from "../../../utils/config";


const StyledBlockTextImagePreview = styled.div`
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
    blockElem: TArticleTextImage,
    i: number
}


const BlockTextImagePreview = ({i, blockElem}: IntroArticleProps) => {

    return (
        <StyledBlockTextImagePreview key={i}>
            <h3>{blockElem.title}</h3>
            <p>{blockElem.paragraph}</p>
            {blockElem.images.length > 0 &&
                <ul>
                    {blockElem.images.filter(base64string => base64string.length > 0).map((image, i) =>
                        <li key={i} className={"capsule-image"}>
                            <img alt={""} src={image}/>
                        </li>
                    )}
                </ul>
            }
        </StyledBlockTextImagePreview>
    );
}

export default React.memo(BlockTextImagePreview);