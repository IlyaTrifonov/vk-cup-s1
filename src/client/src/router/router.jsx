import Letter from '../components/Letter/Letter';
import {folders} from '../api/FoldersService';
import LetterList from '../components/LetterList/LetterList';


/**
 * Доступные роуты для перехода. Используется для компонента AppRouter.
 */
export const routes = [
  {path: folders.incoming.path, element: <LetterList folder={folders.incoming.name}/>},
  {path: folders.important.path, element: <LetterList folder={folders.important.name}/>},
  {path: folders.sent.path, element: <LetterList folder={folders.sent.name}/>},
  {path: folders.drafts.path, element: <LetterList folder={folders.drafts.name}/>},
  {path: folders.archive.path, element: <LetterList folder={folders.archive.name}/>},
  {path: folders.spam.path, element: <LetterList folder={folders.spam.name}/>},
  {path: folders.waste.path, element: <LetterList folder={folders.waste.name}/>},
  {path: '/:folder/letter/:id', element: <Letter/>},
];
