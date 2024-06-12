import React from 'react';
import styled from "styled-components";

const StyledIntroArticle = styled.div`
    display: flex;
    max-width: 1000px;
    width: 100%;
    flex-direction: row;
    min-height: 500px;
    padding: 0 1rem;
    @media only screen and (max-width: 1024px) {
        padding: 1rem;
    }
    aside {
        position: relative;
        flex: 0.7;
        .large-image {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 12px;
        }
        .small-image {
            object-fit: cover;
            width: 40%;
            height: 40%;
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translate(5rem, -4rem);
            border-radius: 12px;
        }
    }
    section {
        flex: 1;
        .strong-points-content {
            margin-left: 7rem;
            h1 {
                margin-top: 0;
                text-transform: uppercase;
                margin-bottom: 3rem;
            }
            h4 {
                margin-bottom: 1rem;
            }
            h4.themes-title,
            h4.tags-title
            {
                text-transform: uppercase;
                margin-bottom: 1rem;
                opacity: 0.5;
            }
            ul.tags {
                display: flex;
                flex-direction: row;
                gap: 0.5rem;
                flex-wrap: wrap;
                margin: 0 0 3rem 0;
                padding: 0;
                li {
                    padding: 0.5rem 0.875rem;
                    font-size: 0.875rem;
                    background-color: lightseagreen;
                    border-radius: 8px;
                    font-weight: 700;
                    color: var(--primary)
                }
            }
            ul.theme-list {
                display:flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                li {
                    display: flex;
                    align-items: center;
                    font-size: 0.875rem;
                    font-weight: 700;
                    gap: 0.5rem;
                    border-radius: 8px;
                    padding: 0.5rem 0.875rem;
                    background-color: var(--quartenary);
                    color: var(--primary)

                }
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        flex-direction: column;
        aside {
            .small-image {
                width: 50%;
                height: 50%;
                right: 1rem;
                bottom: -2rem;
                transform: translate(0, 4rem);
            }
        }
        section {
            .strong-points-content {
                margin-top: 7rem;
                margin-left: initial;
            }
        }
    }
`

interface IntroArticleProps extends React.HTMLProps<HTMLDivElement> {
    firstImage: string,
    secondImage?: string,
    tagsList: string[],
    themeList: string[],
}

const IntroPreview = (props: IntroArticleProps) => {

    console.log(props.tagsList)
    return (
        <StyledIntroArticle {...props}>
            <aside>
                <img className={'large-image'} src={props.firstImage} alt={'codingImg'}/>
                {props.secondImage && <img className={'small-image'} src={props.secondImage} alt={'codingImg'}/>}
            </aside>
            <section>
                <div className={'strong-points-content'}>
                    <h1>Titre Titre Titre Titre</h1>
                    <h4 className={'tags-title'}>Genres</h4>
                    <ul className={'tags'}>
                        {props.tagsList.map((e,i) =>
                            <li key={i}>{e}</li>
                        )}
                    </ul>
                    <h4 className={'themes-title'}>thèmes abordés </h4>
                    <ul className={'theme-list'}>
                        {props.themeList.map((e, i) =>
                            <li key={i}><span>{e}</span></li>
                        )}
                    </ul>
                </div>
            </section>
        </StyledIntroArticle>
    );
}

export default React.memo(IntroPreview);