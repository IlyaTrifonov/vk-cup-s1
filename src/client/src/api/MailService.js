export default class MailService {

    // static url = 'http://127.0.0.1:3000'

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

    static async getLettersFromFolder() {

    }
}