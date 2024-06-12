import React from "react";
import styled, {IStyledComponent} from "styled-components";
import {addNewSecondMainImage, addNewFirstMainImage} from "../../../../redux/ArticleMainImages";
import {useAppDispatch, useAppSelector} from "../../../../redux/store";
import RoundedImageButton from "../../buttons/RoundedImageButton";
import {imageFunctions} from "../../../../utils/functions";

const StyledMainImage: IStyledComponent<any> = styled.div`

    label {
        display: block;
    }

    .main-second-image-container {
        display: flex;
        gap: 1.5rem;

        .second-image {
            button {
                height: 4.5rem;
                width: 4.5rem;
            }
        }
    }
`;

interface StyledMainImageProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}

const TextArea = ({label, ...props}: StyledMainImageProps) => {

    const dispatch = useAppDispatch()
    const mainImagesBase64 = useAppSelector((state) => state.articleMainImages)

    const addingFirstMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        imageFunctions.getBase64(e, (image: string) => {
            dispatch(addNewFirstMainImage({base64: image}))
        })
    }

    const addingSecondMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        imageFunctions.getBase64(e, (image: string) => {
            dispatch(addNewSecondMainImage({base64: image}))
        })
    }

    return (
        <StyledMainImage {...props}>
            <label form={"mainImage"}>{label}</label>
            <div className={"main-second-image-container"}>
                <RoundedImageButton
                    className={'main-image'}
                    base64Image={mainImagesBase64.firstMainImage}
                    onChangeImage={(e) => addingFirstMainImage(e)}
                />
                <RoundedImageButton
                    className={'second-image'}
                    base64Image={mainImagesBase64.secondMainImage}
                    onChangeImage={(e) => addingSecondMainImage(e)}
                />
            </div>
        </StyledMainImage>
    )
}

export default React.memo(TextArea);
