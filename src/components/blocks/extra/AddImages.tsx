import React, {createRef, useCallback, useMemo} from "react";
import styled, {IStyledComponent} from "styled-components";
import {onChangeTextImage} from "../../../redux/ArticleSlice";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {IoCloseOutline} from "react-icons/io5";
import {FaImage} from "react-icons/fa";
import {TArticleTextImage} from "../../../utils/config";
import {imageFunctions} from "../../../utils/functions";

const StyledAddImages: IStyledComponent<any> = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    gap: 1rem;

    ul {
        display: flex;
        flex: 1;
        flex-direction: row;
        position: relative;
        gap: 1rem;
        li {
            background-color: ${props => props.theme.mainColor};
            position: relative;
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            height: 9rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            overflow: hidden;
            background-position: center;
            background-size: auto 100%;

            input {
                display: none;
            }

            .button-add-image {
                flex: 1;
                height: 100%;
                width: 100%;
                background: transparent;
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
    }
`;

interface AddImagesProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
    paragraphIndex: number,
}

const AddImages = ({paragraphIndex, ...rest}: AddImagesProps) => {

    const imagesNumber = 3;

    const paragraphData = useAppSelector((state) => state.article)
    const currentTextImage = paragraphData[paragraphIndex] as TArticleTextImage;
    const dispatch = useAppDispatch()


    const addingNewImage = (
        indexBlock: number,
        indexImage: number,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        imageFunctions.getBase64(e, (base64String: string | null) => {
            if (base64String) {
                let newTextImageObject = {...currentTextImage};
                let dataImage = [...newTextImageObject['images']];
                dataImage[indexImage] = base64String;
                newTextImageObject['images'] = dataImage;
                dispatch(onChangeTextImage({textImage: newTextImageObject, index: indexBlock}));
            }
        })
    }


    const removeAnImage = useCallback((indexBlock: number, indexImage: number) => {
        let newTextImageObject = {...currentTextImage};
        let dataImage = [...newTextImageObject['images']];
        dataImage[indexImage] = '';
        newTextImageObject['images'] = dataImage;
        dispatch(onChangeTextImage({textImage: newTextImageObject, index: indexBlock}));
    }, [paragraphData])


    const inputRefs = useMemo(() => {
        const inputTabRefs = [];
        for (let i = 0; i < imagesNumber; i++) {
            inputTabRefs.push(createRef<HTMLInputElement>())
        }
        return inputTabRefs
    }, [imagesNumber])


    return (
        <StyledAddImages>
            <h4>Ajouter des images</h4>
            <ul>
                {Array.from(Array(imagesNumber), (e, i) => (
                    <li
                        key={i}
                        style={currentTextImage['images'][i] !== '' ? {backgroundImage: `url(${paragraphData[paragraphIndex]['images'][i]})`} : {}}
                    >
                        <button className={"button-add-image"} onClick={() => inputRefs[i].current?.click()}></button>
                        {currentTextImage['images'][i] !== '' &&
                            <button className={"button-rm-image"} onClick={() => removeAnImage(paragraphIndex, i)}>
                                <IoCloseOutline className={'icon-rm'}/>
                            </button>
                        }
                        <input
                            ref={inputRefs[i]}
                            className={'input'}
                            title={""}
                            type={"file"}
                            alt={''}
                            accept={"image/png, image/jpeg, image/webp"}
                            placeholder={""}
                            onChange={(e) => addingNewImage(paragraphIndex, i, e)}
                        />
                        {currentTextImage['images'][i] === '' && <FaImage className={'icon-add'}/>}
                    </li>
                ))}
            </ul>
        </StyledAddImages>
    )
}

export default React.memo(AddImages);

/**
 * {currentTextImage['images'][i] !== '' &&
 *                             <button className={"button-rm-image"} onClick={() => removeAnImage(paragraphIndex, i)}>
 *                                 <IoCloseOutline className={'icon-rm'}/>
 *                             </button>
 *                         }
 *                         <input
 *                             ref={inputRefs[i]}
 *                             className={'input'}
 *                             title={""}
 *                             type={"file"}
 *                             alt={''}
 *                             accept={"image/png, image/jpeg, image/webp"}
 *                             placeholder={""}
 *                             onChange={(e) => addingNewImage(paragraphIndex, i, e)}
 *                         />
 */