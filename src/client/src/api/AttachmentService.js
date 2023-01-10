/**
 * Сервис для получения данных об имени и размере файла вложения.
 */
export default class AttachmentService {

    /**
     * Функция перевода байтов в удобно читаемые единицы.
     * @param {number} bytes - размер файла в байтах.
     * @returns {string} - строковое представление размера файла.
     */
    static getHumanFileSize = (bytes) => {
        let inputData = bytes;

        const dataUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let unit = 0;

        for (; unit < dataUnits.length - 1; unit++) {
            if (inputData / 1024 >= 1)
                inputData /= 1024;
            else break;
        }

        if (inputData % 1 === 0)
            return `${Math.trunc(inputData)} ${dataUnits[unit]}`
        else
            return `${inputData.toFixed(2)} ${dataUnits[unit]}`
    }

    /**
     * Функция получения параметров файла вложения в письмо.
     * @param {string} letterDoc - строка со ссылкой на вложение
     * @returns {Promise<{name: string, size: string}>} - объект с именем и размером файла
     */
    static async getAttachParams(letterDoc) {
        const attach = {name: '', size: ''};
        attach.name = letterDoc.split('/').pop();

        const response = await fetch(letterDoc, {
            method: 'HEAD',
            headers: {
                accept: 'application/json',
            },
        });
        const size = response.headers.get('x-total-size-in-bytes')
        attach.size = AttachmentService.getHumanFileSize(Number.parseInt(size))

        return attach
    }

}