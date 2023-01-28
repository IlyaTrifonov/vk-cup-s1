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
			return `${Math.trunc(inputData)} ${dataUnits[unit]}`;
		else
			return `${inputData.toFixed(2)} ${dataUnits[unit]}`;
	};

	/**
	 * Функция получения параметров вложений в письмо.
	 *
	 * @param {string, string[]} letterDoc - строка со ссылкой на вложение или массив строк со ссылками на вложение
	 * @returns {Promise<*[{name: string, size: string, url: string}]>} - массив объектов с параметрами вложений
	 */
	static async getAttachesParams(letterDoc) {
		// Если вложение одно, то оно приводится к массиву для удобства обработки
		if (!Array.isArray(letterDoc))
			letterDoc = [letterDoc];

		const attachesWithParamsArray = [];
		for (let i = 0; i < letterDoc.length; i++) {
			const attachURL = new URL(letterDoc[i]);

			const attach = {
				name: attachURL.pathname.split('/').pop(),
				size: '',
				url: attachURL.toString(),
			};

			const response = await fetch(attach.url, {
				method: 'HEAD',
				headers: {
					accept: 'application/json',
				},
			});
			const size = response.headers.get('x-total-size-in-bytes');
			attach.size = size;
			// attach.size = AttachmentService.getHumanFileSize(Number.parseInt(size));
			attachesWithParamsArray.push(attach);
		}
		return attachesWithParamsArray;
	}
}
