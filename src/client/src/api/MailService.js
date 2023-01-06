import {folders} from "../components/sidebar/folders";

export default class MailService {

    static hostname = process.env.HOSTNAME || '127.0.0.1'
    static port = process.env.PORT || 3010
    static url = `http://${MailService.hostname}:${MailService.port}`

/*
    static async getOneLetterT() {
        // const url = 'http://127.0.0.1:3000'
        const url = 'http://127.0.0.1:3010/data/13'
        console.log('Начинаем фетчить')
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        })
        console.log('Получили ответ');
        // if (!response.ok) {
        //     throw new Error(`Error! status: ${response.status}`);
        // }
        //
        // const data = await response.json()
        // console.log(data)
        // return data;
        return response;
    }
*/

/*
    static async getSomeLetters() {
        const url = 'http://127.0.0.1:3010/arr'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        })
        return response;
    }
*/

    static getFolderPathByName = (folderName) => {
        // console.log('Ищем роут для', folderName)
        let route = ''
        folders.forEach(folder => {
            if (folder.name === folderName) route = folder.route
        })
        // console.log('Найденный роут:', route)
        return route
    }

    static async getLettersFromFolder(folderName = 'Входящие', limit = 20, offset = 0) {
        // const url = 'http://127.0.0.1:3010/'
        const folder = MailService.getFolderPathByName(folderName)
        const _limit = `limit=${limit}`
        const _offset = `offset=${offset}`
        // const _page = page

        // const queryURL = `${MailService.url}${folder}?${_limit}&${_page}`
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