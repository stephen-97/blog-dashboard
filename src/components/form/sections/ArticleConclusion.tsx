import React, {ChangeEvent, useCallback, useState} from "react";
import styled from "styled-components";
import TextArea from "../inputs/TextArea";
import InputAddTextItems from "../inputs/InputAddTextItems";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {onChangeConclusion} from "../../../redux/ArticleConclusionsSlice";
import Tag from "../buttons/Tag";
import {onChangeArticleTitle} from "../../../redux/ArticleTitleSlice";
import conclusionPreview from "../../preview/ConclusionPreview";


const StyledConclusion = styled.div`
    display: flex;
    flex-direction: column;

    .text-area {
        label {
            color: var(--white);
        }

        textarea {
            height: 15rem;
            border-color: var(--white);
            color: var(--white);
        }
    }

    .good-points, .bad-points {
        display: flex;
        flex-direction: column;

        label, input {
            color: var(--white) !important;
        }

        input {
            border-color: var(--white);
        }

        ul {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 0.5rem;
            color: var(--white);

            li {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
            }
        }
    }
`;

interface ArticleConclusionProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}


const ArticleConclusion = ({label, ...rest}: ArticleConclusionProps) => {

    const articleGameConclusion = useAppSelector((state) => state.articleConclusion)
    const dispatch = useAppDispatch()

    const [goodPoint, setGoodPoint] = useState<string>('');
    const [badPoint, setBadPoint] = useState<string>('');


    const addGoodPoint = () => {
        if (goodPoint.length > 0 && !articleGameConclusion.conclusionGoodPoints.includes(goodPoint)) {
            let newArticleConclusion = {...articleGameConclusion};
            newArticleConclusion.conclusionGoodPoints = [...newArticleConclusion.conclusionGoodPoints, goodPoint]
            dispatch(onChangeConclusion({articleConclusion: newArticleConclusion}));
            setGoodPoint('')
        }
    };

    const addBadPoint = () => {
        if (badPoint.length > 0 && !articleGameConclusion.conclusionBadPoints.includes(badPoint)) {
            let newArticleConclusion = {...articleGameConclusion};
            newArticleConclusion.conclusionBadPoints = [...newArticleConclusion.conclusionBadPoints, badPoint]
            dispatch(onChangeConclusion({articleConclusion: newArticleConclusion}));
            setBadPoint('')
        }
    };

    const handleKeyPressAddGoodPoint = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && goodPoint.length > 0 && !articleGameConclusion.conclusionGoodPoints.includes(goodPoint)) {
            let newArticleConclusion = {...articleGameConclusion};
            newArticleConclusion.conclusionGoodPoints = [...newArticleConclusion.conclusionGoodPoints, goodPoint]
            dispatch(onChangeConclusion({articleConclusion: newArticleConclusion}));
            setGoodPoint('')
        }
    }

    const handleKeyPressAddBadPoint = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && badPoint.length > 0 && !articleGameConclusion.conclusionBadPoints.includes(badPoint)) {
            let newArticleConclusion = {...articleGameConclusion};
            newArticleConclusion.conclusionBadPoints = [...newArticleConclusion.conclusionBadPoints, badPoint]
            dispatch(onChangeConclusion({articleConclusion: newArticleConclusion}));
            setBadPoint('')
        }
    }

    const removePoint = (pointType: 'good' | 'bad', point: string) => {
        if (pointType === 'good') {
            let newArticleConclusion = {...articleGameConclusion};
            newArticleConclusion.conclusionGoodPoints = newArticleConclusion.conclusionGoodPoints.filter((e) => e !== point)
            dispatch(onChangeConclusion({articleConclusion: newArticleConclusion}));
        }
        if (pointType === 'bad') {
            let newArticleConclusion = {...articleGameConclusion};
            newArticleConclusion.conclusionBadPoints = newArticleConclusion.conclusionBadPoints.filter((e) => e !== point)
            dispatch(onChangeConclusion({articleConclusion: newArticleConclusion}));
        }
    }


    const onChangeConclusionText = useCallback((text: string) => {
        let newConclusion = {...articleGameConclusion};
        newConclusion['conclusionText'] = text;
        dispatch(onChangeConclusion({articleConclusion: newConclusion}))
    }, [articleGameConclusion.conclusionText])

    return (
        <StyledConclusion {...rest}>
            <label>{label}</label>
            <section className={'form-section-container'}>
                <TextArea
                    label={'Paragraphe'}
                    classNameContainer={'form-item text-area'}
                    placeholder={"écrivez votre dernier paragraphe "}
                    value={articleGameConclusion.conclusionText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChangeConclusionText(e.target.value)}
                />
                <div className={'good-points form-item'}>
                    <InputAddTextItems
                        classNameContainer={'add-input-component'}
                        label={'Points positifs'}
                        handlePressKeyDown={handleKeyPressAddGoodPoint}
                        adding={addGoodPoint}
                        itemTagsState={{state: goodPoint, set: setGoodPoint}}
                    />
                    {articleGameConclusion.conclusionGoodPoints.length > 0 &&
                        <ul>
                            {articleGameConclusion.conclusionGoodPoints.map((e, i) =>
                                <li key={i}>
                                    <span>- </span>
                                    <Tag className={'tag'} remove={() => removePoint('good', e)} label={e}/>
                                </li>
                            )}
                        </ul>
                    }
                </div>
                <div className={'bad-points form-item'}>
                    <InputAddTextItems
                        className={'add-input-component'}
                        label={'Points à améliorer'}
                        handlePressKeyDown={handleKeyPressAddBadPoint}
                        adding={addBadPoint}
                        itemTagsState={{state: badPoint, set: setBadPoint}}
                    />
                    {articleGameConclusion.conclusionBadPoints.length > 0 &&
                        <ul>
                            {articleGameConclusion.conclusionBadPoints.map((e, i) =>
                                <li key={i}>
                                    <span>- </span>
                                    <Tag className={'tag'} key={i} remove={() => removePoint('bad', e)} label={e}/>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </section>
        </StyledConclusion>
    )
}


export default React.memo(ArticleConclusion);
