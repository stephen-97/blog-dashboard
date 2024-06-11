import React, {ChangeEvent, createRef, useCallback, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/store";
import styled from "styled-components";
import {onChangeMultipleImage, removeBlock} from "../../../../redux/ArticleSlice";
import BlockTitle from "../extra/BlockTitle";
import {FaImage} from "react-icons/fa";
import {TArticleMultipleImages} from "../../../../utils/config";
import InputTextDefault from "../../inputs/InputTextDefault";
import {IoCloseOutline} from "react-icons/io5";
import {imageFunctions} from "../../../../utils/functions";


const StyledImagesBlock = styled.li`

    h3 {
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
    
    ul {
        display: grid;
        grid-template-columns: repeat(3, 0.333fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 1rem;
        flex: 1;
        @media (max-width: 700px) {
            grid-template-columns: repeat(2, 0.5fr);
        }

        .input-image-container {
            background-color: ${props => props.theme.mainColor};
            position: relative;
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 9rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            overflow: hidden;
            background-position: center;
            background-size: cover;

            input {
                display: none;
            }

            .button-rm-image {
                height: 2rem;
                position: absolute;
                top: 0.4rem;
                right: 0.4rem;
                z-index: 2;

                .icon-rm {
                    height: 2rem;
                    width: 2rem;
                }
            }

            .icon-add {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 2rem;
                width: 2rem;
                z-index: 0;
                pointer-events: none;
            }
        }

        .add-input-image-container {
            background-color: #24242e;
            //border: 3px black dashed;

            button {
                background-color: transparent;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;

                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
`;

interface SwiperBlockProps extends React.HTMLProps<HTMLLIElement> {
    i: number,
    e: any,
}

const ImagesBlock = ({i, e, ...rest}: SwiperBlockProps) => {

    const blocksData = useAppSelector((state) => state.article)
    const currentSliderImage = blocksData[i] as TArticleMultipleImages;

    const dispatch = useAppDispatch()

    const AddNewImageSlider = (
        indexBlock: number,
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        imageFunctions.getBase64(e, (base64String: string | null) => {
            if (base64String) {
                let newSliderImageObject = {...currentSliderImage};
                let newDataImage = [...newSliderImageObject['images']];
                newDataImage.push(base64String);
                newSliderImageObject['images'] = newDataImage;
                dispatch(onChangeMultipleImage({multipleImages: newSliderImageObject, index: indexBlock}));
            }
        })
    }


    const inputRefs = useMemo(() => {
        const inputTabRefs = [];
        const blockImageLength = blocksData[i].images.length ? blocksData[i].images.length : 0;
        if (blocksData) {
            for (let i = 0; i <= blockImageLength; i++) {
                inputTabRefs.push(createRef<HTMLInputElement>())
            }
        }
        return inputTabRefs
    }, [blocksData])

    const onChange = useCallback((param: 'title', value: any) => {
        let newSliderImageObject = {...currentSliderImage};
        newSliderImageObject[param] = value;
        dispatch(onChangeMultipleImage({multipleImages: newSliderImageObject, index: i}));
    }, [currentSliderImage]);

    const removeAnImage = useCallback((indexBlock: number, indexImage: number) => {
        let newSliderImageObject = {...currentSliderImage};
        newSliderImageObject['images'] = [...newSliderImageObject['images']].filter((e, i) => i!==indexImage)
        dispatch(onChangeMultipleImage({multipleImages: newSliderImageObject, index: indexBlock}));
    }, [currentSliderImage])

    return (
        <StyledImagesBlock {...rest}>
            <BlockTitle
                title={'SLIDER IMAGES'}
                index={i + 1}
                setDeleteBlock={() => dispatch(removeBlock({index: i}))}
            />
            <InputTextDefault
                placeholder={'Titre du block'}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('title', e.target.value)}
            />
            <h4>Ajouter des images au slider</h4>
            <ul>
                {blocksData[i].images.map((e, j) =>
                    <li
                        key={j}
                        className={'input-image-container'}
                        style={{backgroundImage: `url(${e})`}}
                    >
                        <button
                            className={"button-add-image"}
                            onClick={() => inputRefs[j].current?.click()}
                        />
                        <input
                            ref={inputRefs[j]}
                            className={'input'}
                            title={""}
                            type={"file"}
                            alt={''}
                            accept={"image/png, image/jpeg, image/webp"}
                            placeholder={""}
                            onChange={(e) => AddNewImageSlider(j, e)}
                        />
                        <button className={"button-rm-image"} onClick={() => removeAnImage(i, j)}>
                            <IoCloseOutline className={'icon-rm'}/>
                        </button>
                    </li>
                )}
                {blocksData[i].images.length < 6 &&
                    <li className={'add-input-image-container input-image-container'}>
                        <button
                            className={"button-add-image"}
                            onClick={() => inputRefs[blocksData[i].images.length].current?.click()}
                        >
                            <FaImage className={'icon-add'}/>
                        </button>
                        <input
                            ref={inputRefs[blocksData[i].images.length]}
                            className={'input'}
                            title={""}
                            type={"file"}
                            alt={''}
                            accept={"image/png, image/jpeg, image/webp"}
                            placeholder={""}
                            onChange={(e) => AddNewImageSlider(i, e)}
                        />
                    </li>
                }
            </ul>
        </StyledImagesBlock>
    )
}

export default React.memo(ImagesBlock)