import {folders} from "../components/sidebar/folders";

export default class MailService {

    // static hostname = process.env.HOSTNAME || '127.0.0.1'
    // static port = process.env.PORT || 3010
    // static url = `http://${MailService.hostname}:${MailService.port}`
    static url = process.env.REACT_APP_API_URL;

    static getFolderPathByName = (folderName) => {
        let route = ''
        Object.entries(folders).map(([key, value]) => {
            if (value.name === folderName) route = value.path
        });
        /*
                folders.forEach(folder => {
                    if (folder.name === folderName) route = folder.route
                })
        */
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