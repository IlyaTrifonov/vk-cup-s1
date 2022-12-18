import LetterList from "../components/LetterList/LetterList";

export const routes = [
    {path: '/inbox', element: <LetterList folder='Входящие'/>},
    {path: '/important', element: <LetterList folder='Важные'/>}
]