import {ReactElement} from "react";
export const responsiveValue = 700;
export interface IRouteItem {
    itemName: string,
    routeName: string,
}
export type TAritcleContent =  {
    paragraph: string,
    images: string[],
}
export const routesItem: Array<IRouteItem>= [
    {itemName: 'Créer un article', routeName: 'create'},
    {itemName: 'Mes articles', routeName: 'articles'},
];