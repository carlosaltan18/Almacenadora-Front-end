import { AuthPage } from "./Pages/Auth/AuthPage.jsx";
import {ListaTareas} from './ListaTareas.jsx'

export const routes = [
    {path: '/*', element: <AuthPage/>},
    {path: '/lista', element: <ListaTareas/>}
]