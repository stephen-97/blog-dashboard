import {ReactElement} from "react";

export interface IRouteItem {
    itemName: string,
    routeName: string,
}
export const routesItem: Array<IRouteItem>= [
    {itemName: 'Créer un article', routeName: 'create'},
    {itemName: 'Mes articles', routeName: 'articles'},
];