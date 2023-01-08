import {folders} from "./FoldersService";


export default class MailService {
    static url = process.env.REACT_APP_API_URL;

    static getFolderPathByName = (folderName) => {
        let route = ''
        Object.entries(folders).map(([key, value]) => {
            if (value.name === folderName) route = value.path
        });
        return route
    }

    static async getLettersFromFolder(folderName = 'Входящие', limit = 20, offset = 0) {
        const folder = MailService.getFolderPathByName(folderName)
        const _limit = `limit=${limit}`
        const _offset = `offset=${offset}`

        const queryURL = `${MailService.url}/backend${folder}?${_limit}&${_offset}`// тут тоже поменял

        const response = await fetch(queryURL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        })
        return response;
    }

    static async getLetterById(id) {
        const queryURL = `${MailService.url}/backend/letter/${id}`
        const response = await fetch(queryURL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        })
        return response;
    }
}