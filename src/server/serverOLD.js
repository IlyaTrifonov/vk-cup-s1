const http = require('http');
const fs = require('fs');
const url = require('url');

const HOSTNAME = '127.0.0.1';
const PORT = 3010;

const IS_PRODUCTION = false;


/*
* Блок чтения входного файла с письмами, создание папок и ресурсов из писем.
* */
//TODO Файла может не оказаться, нужно выводить ошибку
const rawData = fs.readFileSync('db.json');
//TODO Может быть ошибка парсинга, её нужно обработать
const data = JSON.parse(rawData);

if (fs.existsSync('./files')) {
    console.log('Папка ресурсов обнаружена');
    fs.rmSync('./files', {recursive: true});
    console.log('Папка ресурсов удалена')
} else {
    console.log('Папка ресурсов не найдена');
}
fs.mkdirSync('./files');
fs.mkdirSync('./files/attachments');
fs.mkdirSync('./files/avatars');
console.log('Папка ресурсов создана');

const pictureTypes = {
    attachments: 'attachments',
    avatars: 'avatars'
}


/*
* Функция создания файла вложения и возврата ссылки на этот файл
* */

let pictureNumber = 1;
const makePictureAndUrl = (image, type) => {
    const base64img = image.split(',')[1];
    const buff = Buffer.from(base64img, 'base64');
    const path = `/files/${type}/picture_${pictureNumber++}.png`
    fs.writeFileSync(`.${path}`, buff);
    return `http://${HOSTNAME}:${PORT}${path}`
}


/*
* Функция сортировки писем по дате
* */
const sortFunctionByDate = (a, b) => {
    const dateA = Date.parse(a.date)
    const dateB = Date.parse(b.date)
    return dateA - dateB
}

/*
const setFlag = (flag) => {
    switch (flag) {
        case 'Заказы':
            return 'orders'
        case 'Финансы':
            return 'finances'
        case 'Регистрации':
            return 'registrations'
        case 'Путешествия':
            return 'travels'
        case 'Билеты':
            return 'tickets'
        case 'Штрафы и налоги':
            return 'government'
        default:
            return null
    }
}
*/


/*
* Обработка данных писем, создание файлов влжений и ссылок на них
* */

data.forEach((letter, index) => {
    letter.id = index
    if (letter.hasOwnProperty('doc')) {
        const docImg = letter.doc.img;
        if (Array.isArray(docImg)) {
            const imagesUrls = [];
            docImg.forEach(image => {
                imagesUrls.push(makePictureAndUrl(image, pictureTypes.attachments))
            })
            letter.doc.img = imagesUrls;
        } else {
            letter.doc.img = makePictureAndUrl(docImg, pictureTypes.attachments);
        }
    }
    if (letter.hasOwnProperty('author')
        && letter.author.hasOwnProperty('avatar')) {
        letter.author.avatar = makePictureAndUrl(letter.author.avatar, pictureTypes.avatars);
    }
    if (letter.hasOwnProperty('to')) {
        letter.to.forEach(person => {
            if (person.hasOwnProperty('avatar')) {
                person.avatar = makePictureAndUrl(person.avatar, pictureTypes.avatars);
            }
        })
    }
    if (letter.flag) {
        if (letter.flag === 'Путешевствия')
            letter.flag = 'Путешествия' // Какие данные дали, так и адаптируемся)))
    }
})
console.log('Ресурсы созданы');
data.sort(sortFunctionByDate).reverse();
console.log('Письма отсортированы');


/*
* Создание сервера и его настройка
* */

// Папки на клиенте
const folders = {
    inbox: 'Входящие',
    important: 'Важное',
    sent: 'Отправленные',
    drafts: 'Черновики',
    archive: 'Архив',
    spam: 'Спам',
    waste: 'Корзина'
}

// Маршруты клиентского роутинга
const routes = [
    '/',
    '/inbox',
    '/important',
    '/sent',
    '/drafts',
    '/archive',
    '/spam',
    '/waste'
];

// Мимтайпс для файлов TODO сократить
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'font-woff',
    '.ttf': 'font-ttf',
    '.eot': 'vnd.ms-fontobject',
    '.otf': 'font-otf',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('')
    console.log(`Request (${req.method}):`, req.url);

    const parsedURL = url.parse(req.url, true); //todo убрать это отсюда и переделать
    console.log('Request:', parsedURL.path)


    const path = parsedURL.pathname.split('/');
    console.log('path:', path)

    if (IS_PRODUCTION) {
        let pagePath = ''

    }

    const path1 = parsedURL.pathname.split('/')[1]
    if (Object.keys(folders).includes(path1)) {
        try {
            const offset = parsedURL.query.offset
            const limit = parsedURL.query.limit
            let myData = []
            res.setHeader('x-folder', path1)
            if (path1 === 'inbox') {
                myData = data.filter(letter => !letter.hasOwnProperty('folder'));
            } else {
                myData = data.filter(letter => letter.folder === folders[path1]);
            }
            res.setHeader('x-total-letters-count', myData.length)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(myData.slice(offset, limit)));
        } catch (e) {
            console.log('Not Found')
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
    } else
    switch (path[1]) {
        case 'files': {
            fs.readFile(`.${parsedURL.pathname}`, (err, data) => {
                if (err) {
                    console.log('Not Found')
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                }
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.write(data);
                return res.end();
            })
            break;
        }
        case 'letter': {
            const letterNumber = path[2]
            console.log('Letter number: ', letterNumber)
            let letter = null
            data.forEach(dataLetter => {
                if (dataLetter.id.toString() === letterNumber) {
                    letter = dataLetter
                }
            })
            if (!letter) {
                console.log('Not Found')
                console.log('Всего писем', data.length)
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(letter));
            break;
        }
        default: {
            console.log('Not Found')
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
    }
})

server.listen(PORT, HOSTNAME, () => {
    console.log(`Сервер запущен на http://${HOSTNAME}:${PORT}/`)
})
