import {ReactElement} from "react";
import Home from "../pages/Home";

export interface IRouteItem {
    itemName: string,
    routeName: string,
    element: ReactElement
}
export const routesItem: Array<IRouteItem>= [
    {itemName: 'Créer un article', routeName: 'create', element: <Home/>},
    {itemName: 'Mes articles', routeName: 'articles', element: <Home/>},
];