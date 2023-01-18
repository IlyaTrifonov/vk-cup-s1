const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require("path");

const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 3000;

const IS_PRODUCTION = false;

/*
* Блок чтения входного файла с письмами, создание папок.
* */

let data;
try {
    const rawData = fs.readFileSync('db.json');
    data = JSON.parse(rawData);
} catch (err) {
    if (err.code === 'ENOENT') {
        console.error('Ошибка! Файл db.json не найден!');
    } else {
        console.error('Ошибка парсинга JSON:', err.message);
    }
    process.exit()
}

try {
    if (fs.existsSync('./files')) {
        console.log('Найдена старая папка ресурсов.');
        fs.rmSync('./files', {recursive: true});
        console.log('Старая папка ресурсов удалена.')
    } else {
        console.log('Старых папок ресурсов не обнаружено.');
    }
} catch (err) {
    console.error('Ошибка проверки папки ресурсов:', err.message);
    process.exit()
}

try {
    fs.mkdirSync('./files');
    fs.mkdirSync('./files/attachments');
    fs.mkdirSync('./files/avatars');
    console.log('Папки ресурсов созданы.');
} catch (err) {
    console.error('Ошибка создания папок ресурсов:', err.message);
    process.exit()
}


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
    const path = `/files/${type}/picture_${pictureNumber++}.png`;// тут поменял
    fs.writeFileSync(`.${path}`, buff);
    return `http://${HOSTNAME}:${PORT}/backend${path}`
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
console.log('Ресурсы созданы и помещены в папки.');
data.sort(sortFunctionByDate).reverse();
console.log('Письма обработаны и отсортированы.');


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

// Мимтайпс для файлов
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
    res.setHeader('Access-Control-Expose-Headers', '*');

    console.log('')
    console.log(`Request (${req.method}):`, req.url);

    const parsedURL = url.parse(req.url, true);
    console.log('Request:', parsedURL.path)


    const pathL = parsedURL.pathname.split('/');
    console.log('path:', pathL)

    const newPathArr = parsedURL.pathname.split('/').slice(1);

    if (IS_PRODUCTION && !req.url.includes('/backend')) {
        console.log('Обращение к фронтенду')
        let filePath = '.' + req.url;
        if (routes.includes(req.url) || (req.url.includes('/letter'))) {
            filePath = './index.html';
        }
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'octet-stream';

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code === 'ENOENT') {
                    fs.readFile('./404.html', function(error, content) {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content, 'utf-8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end('Ошибка сервера: '+error.code+' ..\n');
                    res.end();
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

    if (newPathArr[0] === 'backend') {
        console.log('Обращение к бэкенду')
        const path1 = newPathArr[1]
        if (Object.keys(folders).includes(path1)) {
            try {
                const offset = parsedURL.query.offset
                const limit = parsedURL.query.limit
                let myData = []
                res.setHeader('x-folder', path1)
                // В папку входящие(inbox) попадают все письма у которых нет поля folder
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
        } else {
            switch (newPathArr[1]) {
                case 'files': {
                    fs.readFile(`.${parsedURL.pathname.replace('/backend', '')}`, (err, data) => {
                        if (err) {
                            console.log('Not Found')
                            res.writeHead(404, {'Content-Type': 'text/html'});
                            return res.end("404 Not Found");
                        }
                        const fileStats = fs.statSync(`.${parsedURL.pathname.replace('/backend', '')}`);
                        res.setHeader('x-total-size-in-bytes', fileStats.size);
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        res.write(data);
                        return res.end();
                    })
                    break;
                }
                case 'letter': {
                    const letterNumber = newPathArr[2]
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
        }
    }

})

server.listen(PORT, HOSTNAME, () => {
    console.log(`Сервер запущен на http://${HOSTNAME}:${PORT}/`)
})

