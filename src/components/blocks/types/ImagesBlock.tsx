import React, {createRef, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import styled from "styled-components";
import {onChangeMultipleImage, removeBlock} from "../../../redux/ArticleSlice";
import BlockTitle from "../extra/BlockTitle";
import {FaImage} from "react-icons/fa";
import {TArticleMultipleImages} from "../../../utils/config";


const StyledImagesBlock = styled.li`

    h3 {
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    ul {
        display: grid;
        //grid-template-columns: repeat(auto-fit, minmax(40%, 0.5fr));
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(6, 1fr);
        //background-color: #61dafb;
        gap: 1rem;
        flex: 1;

        .input-image-container:nth-of-type(1) {
            grid-area: 1 / 1 / 3 / 3;
        }

        .input-image-container:nth-of-type(2) {
            grid-area: 1 / 3 / 3 / 5;
        }

        .input-image-container:nth-of-type(3) {
            grid-area: 3 / 1 / 5 / 3;
        }

        .input-image-container:nth-of-type(4) {
            grid-area: 3 / 3 / 5 / 5;
        }

        .input-image-container:nth-of-type(5) {
            grid-area: 5 / 1 / 7 / 3;
        }

        .input-image-container:nth-of-type(6) {
            grid-area: 5 / 3 / 7 / 5;
        }

        .input-image-container {
            background-color: ${props => props.theme.mainColor};
            position: relative;
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: var(--border-radius);
            cursor: pointer;
            overflow: hidden;
            background-position: center;
            background-size: auto 100%;

            input {
                display: none;
            }

            .button-add-image {
                height: 100%;
                width: 100%;
                //background: transparent;
                z-index: 0;
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
            background-color: gray;
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

                span {
                    font-weight: 700;
                    font-size: 1.125rem;
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

    const imagesNumber = 9;
    const blocksData = useAppSelector((state) => state.article)
    const currentSliderImage = blocksData[i] as TArticleMultipleImages;

    const dispatch = useAppDispatch()

    const AddNewImageSlider = (
        indexBlock: number,
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        getBase64(e, (base64String: string | null) => {
            if (base64String) {
                let newSliderImageObject = {...currentSliderImage};
                let newDataImage = [...newSliderImageObject['images']];
                newDataImage.push(base64String);
                newSliderImageObject['images'] = newDataImage;
                dispatch(onChangeMultipleImage({multipleImages: newSliderImageObject, index: indexBlock}));
            }
        })
    }


    const getBase64 = (e: React.ChangeEvent<HTMLInputElement>, callBack: Function) => {
        //let base64String: string  = ""
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result as string;
                image.onload = () => {
                    if (image.width / image.height !== 1920 / 1080) {
                        alert("Mauvais format image, l'aspect ratio doit être de 16:9");
                        return
                    }
                    callBack(image.src ?? "")
                }
            }
        }
    }

    const [tab, setTab] = useState<string[]>([])


    const inputRefs = useMemo(() => {
        const inputTabRefs = [];
        const blockImageLength = blocksData[i].images.length ? blocksData[i].images.length : 0;
        if(blocksData) {
            for (let i = 0; i < blocksData[i].images.length + 1; i++) {
                inputTabRefs.push(createRef<HTMLInputElement>())
            }
        }
        return inputTabRefs
    }, [imagesNumber, blocksData])

    return (
        <StyledImagesBlock {...rest}>
            <BlockTitle
                title={'SLIDER IMAGES'}
                index={i + 1}
                setDeleteBlock={() => dispatch(removeBlock({index: i}))}
            />
            <ul>
                {blocksData[i].images.map((e, i) =>
                    <li key={i} className={'input-image-container'}>
                        <div>
                            <button className={"button-add-image"}
                                    onClick={() => inputRefs[i].current?.click()}></button>
                            <input
                                ref={inputRefs[i]}
                                className={'input'}
                                title={""}
                                type={"file"}
                                alt={''}
                                accept={"image/png, image/jpeg, image/webp"}
                                placeholder={""}
                            />
                        </div>
                    </li>
                )}
                <li className={'add-input-image-container input-image-container'}>
                    <div>
                        <button
                            className={"button-add-image"}
                            onClick={() => inputRefs[blocksData[i].images.length + 1].current?.click()}
                        >
                            <FaImage size={50}/>
                            <span>Ajouter une image</span>
                        </button>
                        <input
                            ref={inputRefs[blocksData[i].images.length + 1]}
                            className={'input'}
                            title={""}
                            type={"file"}
                            alt={''}
                            accept={"image/png, image/jpeg, image/webp"}
                            placeholder={""}
                            onChange={(e) => AddNewImageSlider(i, e)}
                        />
                    </div>
                </li>
            </ul>
        </StyledImagesBlock>
    )
}

export default ImagesBlock

//                        {paragraphData[paragraphIndex]['images'][i] === '' && <FaImage className={'icon-add'} /> }