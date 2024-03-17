import {ReactElement} from "react";
import { IoIosCreate } from "react-icons/io";
import { MdArticle } from "react-icons/md";

export const responsiveValue = 700;
export interface IRouteItem {
    itemName: string,
    routeName: string,
    icon: ReactElement,
}
export type TAritcleContent =  {
    index: number,
    paragraph: string,
    images: any,
    title : string,
    //images: [any] | [],
}
export type TToggleButton = {
    title: string;
    callBack: Function;
}

export const routesItem: Array<IRouteItem>= [
    {itemName: 'Créer un article', routeName: 'create', icon: <IoIosCreate />},
    {itemName: 'Mes articles', routeName: 'articles', icon: <MdArticle />},
];