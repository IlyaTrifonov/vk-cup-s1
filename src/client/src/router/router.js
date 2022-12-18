import Content from "../components/Content";

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

export const routes = [
    {path: '/inbox', element: <Content folder='Входящие'/>},
    {path: '/important', element: <Content folder='Важное'/>},
    {path: '/sent', element: <Content folder='Отправленные'/>},
    {path: '/drafts', element: <Content folder='Черновики'/>},
    {path: '/archive', element: <Content folder='Архив'/>},
    {path: '/spam', element: <Content folder='Спам'/>},
    {path: '/waste', element: <Content folder='Корзина'/>}
]