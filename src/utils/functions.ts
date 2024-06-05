import React from "react";

export const articleFunctions = {
    dataImageIsNotEmpty: (dataImage: string[]) => dataImage.reduce((acc, value) => acc + value, "").length > 0,
}

export const imageFunctions = {
    getBase64 : (e: React.ChangeEvent<HTMLInputElement>, callBack: Function) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result as string;
                image.onload = () => {
                    if (image.width / image.height !== 1920 / 1080) {
                        //alert("Mauvais format image, l'aspect ratio doit être de 16:9");
                        //return
                    }
                    callBack(image.src ?? "")
                }
            }
        }
    }
}
