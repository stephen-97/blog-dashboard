import React, {useState} from "react";
import styled from "styled-components";
import TextArea from "./inputs/TextArea";
import InputLabelBorder from "./inputs/InputLabelBorder";
import TextAreaLabelBorder from "./inputs/TextAreaLabelBorder";
import InputTextDefault from "./inputs/InputTextDefault";
import InputAddTextItems from "./inputs/InputAddTextItems";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {onChangeConclusion} from "../../redux/ArticleConclusionsSlice";
import {add} from "../../redux/ArticleGameTagsSlice";
import Tag from "./buttons/Tag";


const StyledConclusion = styled.div`
    display: flex;
    flex-direction: column;

    .conclusion-input {
        height: 15rem;
    }

    .form-item {
        margin-bottom: 2rem;
    }

    .input-label-border {
        background-color: var(--white);

        &:valid ~ label,
        &:focus ~ label {
            background-color: var(--dark-gray-2);
            color: var(--white);
            border-radius: var(--border-radius);
        }
    }
    
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

    .good-bad-points-container {
        display: flex;
        padding: 1rem;
        background-color: var(--white);
        min-height: 20rem;
        border-radius: var(--border-radius);
        gap: 2rem;
        @media (max-width: 1028px)  {
            flex-direction: column;
        }

        > * {
            flex: 1;
        }

        h3 {
            text-transform: uppercase;
            margin-bottom: 1rem;
        }

        .good-points, .bad-points {
            display: flex;
            flex-direction: column;

            ul {
                display: flex;
                flex-direction: column;
                align-items: start;
                gap: 0.5rem;
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


    return (
        <StyledConclusion {...rest}>
            <label>{label}</label>
            <section className={'form-section-container'}>
                <TextArea
                    label={'Paragraphe'}
                    className={'form-item text-area'}
                    placeholder={"écrivez votre dernier paragraphe "}
                />
                <div className={'good-bad-points-container'}>
                    <div className={'good-points'}>
                        <h3>Points positifs</h3>
                        <InputAddTextItems
                            className={'add-input-component'}
                            label={'points positifs'}
                            handlePress={handleKeyPressAddGoodPoint}
                            addButton={addGoodPoint}
                            itemTagsState={{state: goodPoint, set: setGoodPoint}}
                        />
                        {articleGameConclusion.conclusionGoodPoints.length > 0 &&
                            <ul>
                                {articleGameConclusion.conclusionGoodPoints.map((e, i) =>
                                    <Tag remove={() => removePoint('good', e)} label={e}/>
                                )}
                            </ul>
                        }
                    </div>
                    <div className={'bad-points'}>
                        <h3>Points à retravailler</h3>
                        <InputAddTextItems
                            className={'add-input-component'}
                            label={'points à améliorer'}
                            handlePress={handleKeyPressAddBadPoint}
                            addButton={addBadPoint}
                            itemTagsState={{state: badPoint, set: setBadPoint}}
                        />
                        {articleGameConclusion.conclusionBadPoints.length > 0 &&
                            <ul>
                                {articleGameConclusion.conclusionBadPoints.map((e, i) =>
                                    <Tag remove={() => removePoint('bad', e)} label={e}/>
                                )}
                            </ul>
                        }
                    </div>
                </div>
            </section>
        </StyledConclusion>
    )
}


export default React.memo(ArticleConclusion);

/**
 *    <InputLabelBorder
 *                     label={"TEST"}
 *                     className={'form-item input-label-border'}
 *                 />
 *                 <TextAreaLabelBorder label={"Résumé conclusion"} className={'form-item input-label-border'}/>
 */