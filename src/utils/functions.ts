export const articleFunctions = {
    dataImageIsNotEmpty: (dataImage: string[]) => dataImage.reduce((acc, value) => acc + value, "").length > 0,
}

