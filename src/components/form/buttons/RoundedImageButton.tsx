import React, {createRef} from "react";
import styled from "styled-components";
import {FaPlusCircle} from "react-icons/fa";

const StyledRoundedImageButton = styled.div<{ $base64Image: string }>`
        position: relative;
        display: flex;
        align-items: end;
        button {
            height: 6rem;
            width: 6rem;
            border-radius: 100px;
            //background-color: #282c34;
            //background-position: center;
            background:  ${props => props.$base64Image.length > 0 ? `url(${props.$base64Image})` : ''} center;
            background-size: cover;
        }

        input {
            display: none;
        }

        svg {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 1.5rem;
            width: auto;
            background-color: var(--white);
            border-radius: 20rem;
        }
        &.secondImage {
            button {
                height: 4rem;
                width: 4rem;
                border-radius: 100px;
                background-position: center;
                background-size: auto 100%;
            }
        }
`;

interface RoundedImageButtonProps extends React.HTMLProps<HTMLDivElement> {
    onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void,
    base64Image: string,
}

const RoundedImageButton = ({base64Image, onChangeImage, ...rest}: RoundedImageButtonProps) => {

    const inputImageRef = createRef<HTMLInputElement>();

    return (
        <StyledRoundedImageButton $base64Image={base64Image} {...rest} className={`rounded-image-button ${rest.className}`}>
            <button
                className={"button-add-image"}
                onClick={() => inputImageRef.current?.click()}
            />
            <input
                ref={inputImageRef}
                type={'file'}
                id={"mainImage"}
                name={"mainImage"}
                accept={"image/png, image/jpeg, image/webp"}
                alt={''}
                placeholder={""}
                onChange={onChangeImage}
            />
            <FaPlusCircle/>
        </StyledRoundedImageButton>
    )
}

export default React.memo(RoundedImageButton);