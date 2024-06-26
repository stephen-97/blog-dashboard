import {ReactElement} from "react";
import { IoIosCreate } from "react-icons/io";
import { MdArticle } from "react-icons/md";

export const responsiveValue = 700;
export interface IRouteItem {
    itemName: string,
    routeName: string,
    icon: ReactElement,
}
export type TArticleTextImage =  {
    type: string,
    paragraph: string,
    images: string[],
    title : string,
    //images: [any] | [],
}
export type TArticleMultipleImages =  {
    type: string,
    title : string,
    images: string[],
}

export type TArticleContent = TArticleTextImage | TArticleMultipleImages;

export type TToggleButton = {
    title: string;
    callBack: Function;
}

export const routesItem: Array<IRouteItem>= [
    {itemName: 'Créer un article', routeName: 'create', icon: <IoIosCreate />},
    {itemName: 'Mes articles', routeName: 'articles', icon: <MdArticle />},
];

export const allowedImages = 'image/png, image/jpeg, image/webp';