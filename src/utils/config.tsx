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
    paragraph: string,
    images: any,
    //images: [any] | [],
}
export const routesItem: Array<IRouteItem>= [
    {itemName: 'Créer un article', routeName: 'create', icon: <IoIosCreate />},
    {itemName: 'Mes articles', routeName: 'articles', icon: <MdArticle />},
];