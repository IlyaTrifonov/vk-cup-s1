import {folders} from './FoldersService';


export default class MailService {
  static url = import.meta.env.VITE_API_URL;

  static getFolderPathByName = (folderName) => {
    let route = '';
    Object.entries(folders).forEach(([_, value]) => {
      if (value.name === folderName) route = value.path;
    });
    return route;
  };

  static async getLettersFromFolder(folderName = folders.incoming.name, limit = 20, offset = 0, filtersValues) {
    const folderPath = MailService.getFolderPathByName(folderName);
    const _limit = `limit=${limit}`;
    const _offset = `offset=${offset}`;
    const _isUnread = `isUnread=${filtersValues.isUnread | 0}`;
    const _isFlagged = `isFlagged=${filtersValues.isFlagged | 0}`;
    const _isWithAttachment = `isWithAttachment=${filtersValues.isWithAttachment | 0}`;
    const filters = `&${_isUnread}&${_isFlagged}&${_isWithAttachment}`;

    const queryURL = `${MailService.url}/backend${folderPath}?${_limit}&${_offset}${filters}`;// тут тоже поменял
    // console.log(queryURL)

    const response = await fetch(queryURL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    return response;
  }

  static async getLetterById(id) {
    const queryURL = `${MailService.url}/backend/letter/${id}`;
    const response = await fetch(queryURL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    return response;
  }
}
