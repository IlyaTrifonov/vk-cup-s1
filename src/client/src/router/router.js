import Letter from "../components/Letter/Letter";
import {folders} from "../api/FoldersService";
import LetterList from "../components/LetterList/LetterList";

/*
export const routes = [
    {path: '/inbox', element: <LetterList folder='Входящие'/>},
    {path: '/important', element: <LetterList folder='Важные'/>},
    {path: '/sent', element: <LetterList folder='Отправленные'/>},
    {path: '/drafts', element: <LetterList folder='Черновики'/>},
    {path: '/archive', element: <LetterList folder='Архив'/>},
    {path: '/spam', element: <LetterList folder='Спам'/>},
    {path: '/waste', element: <LetterList folder='Корзина'/>}
]
*/

/*
export const routes = [
    {path: '/inbox', element: <Content folder='Входящие'/>},
    {path: '/important', element: <Content folder='Важное'/>},
    {path: '/sent', element: <Content folder='Отправленные'/>},
    {path: '/drafts', element: <Content folder='Черновики'/>},
    {path: '/archive', element: <Content folder='Архив'/>},
    {path: '/spam', element: <Content folder='Спам'/>},
    {path: '/waste', element: <Content folder='Корзина'/>},
    {path: '/letter/:id', element: <Letter folder={null}/>}
]
*/

export const routes = [
    {path: folders.incoming.path, element: <LetterList folder={folders.incoming.name}/>},
    {path: folders.important.path, element: <LetterList folder={folders.important.name}/>},
    {path: folders.sent.path, element: <LetterList folder={folders.sent.name}/>},
    {path: folders.drafts.path, element: <LetterList folder={folders.drafts.name}/>},
    {path: folders.archive.path, element: <LetterList folder={folders.archive.name}/>},
    {path: folders.spam.path, element: <LetterList folder={folders.spam.name}/>},
    {path: folders.waste.path, element: <LetterList folder={folders.waste.name}/>},
    {path: '/letter/:id', element: <Letter folder={null}/>}
]