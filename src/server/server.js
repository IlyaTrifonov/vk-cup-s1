const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3010;

//TODO Файла может не оказаться, нужно выводить ошибку
const rawData = fs.readFileSync('db.json');
//TODO Может быть ошибка парсинга, её нужно обработать
const data = JSON.parse(rawData);

if (fs.existsSync('./files')) {
    console.log('Папка есть');
    fs.rmSync('./files', {recursive: true});
    console.log('Папка удалена')
}
console.log('Папки нет');
fs.mkdirSync('./files');
fs.mkdirSync('./files/attachments');
fs.mkdirSync('./files/avatars');
console.log('Папки созданы');

/*
let imgNumber = 1;
const makePicAndUrl = (image) => {
    const base64img = image.split(',')[1];
    const buff = Buffer.from(base64img, 'base64');
    fs.writeFileSync(`./files/attachments/picture_${imgNumber}.png`, buff);
    return `http://${hostname}:${port}/files/attachments/picture_${imgNumber++}.png`
}

let avatarNumber = 1;
const makeAvatarAndUrl = (image) => {
    const base64img = image.split(',')[1];
    const buff = Buffer.from(base64img, 'base64');
    fs.writeFileSync(`./files/avatars/picture_${avatarNumber}.png`, buff);
    return `http://${hostname}:${port}/files/avatars/picture_${avatarNumber++}.png`
}
*/

let pictureNumber = 1;
const pictureTypes = {
    attachments: 'attachments',
    avatars: 'avatars'
}
const makePictureAndUrl = (image, type) => {
    const base64img = image.split(',')[1];
    const buff = Buffer.from(base64img, 'base64');
    const path = `/files/${type}/picture_${pictureNumber++}.png`
    fs.writeFileSync(`.${path}`, buff);
    return `http://${hostname}:${port}${path}`
}

const sortFunctionByDate = (a, b) => {
    const dateA = Date.parse(a.date)
    const dateB = Date.parse(b.date)
    return dateA - dateB
}
/*
const sortFunctionByDateL = (a, b) => {
    const dateA = Date.parse(new Date(a.date).toLocaleString())
    const dateB = Date.parse(new Date(b.date).toLocaleString())
    return dateA - dateB
}

const sortFunctionByDateReversed = (a, b) => {
    const dateA = Date.parse(a.date)
    const dateB = Date.parse(b.date)
    return dateB - dateA
}
*/

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

// let imgNumber = 1;
data.forEach(letter => {
    if (letter.hasOwnProperty('doc')) {
        const docImg = letter.doc.img;
        if (Array.isArray(docImg)) {
            const imagesUrls = [];
            docImg.forEach(image => {
                // imagesUrls.push(makePicAndUrl(image))
                imagesUrls.push(makePictureAndUrl(image, pictureTypes.attachments))
            })
            letter.doc.img = imagesUrls;
        } else {
            // letter.doc.img = makePicAndUrl(docImg);
            letter.doc.img = makePictureAndUrl(docImg, pictureTypes.attachments);
        }
    }
    if (letter.hasOwnProperty('author')
        && letter.author.hasOwnProperty('avatar')) {
        // letter.author.avatar = makeAvatarAndUrl(letter.author.avatar);
        letter.author.avatar = makePictureAndUrl(letter.author.avatar, pictureTypes.avatars);
    }
    if (letter.hasOwnProperty('to')) {
        letter.to.forEach(person => {
            if (person.hasOwnProperty('avatar')) {
                // person.avatar = makeAvatarAndUrl(person.avatar);
                person.avatar = makePictureAndUrl(person.avatar, pictureTypes.avatars);
            }
        })
    }
    if (letter.flag) {
        if (letter.flag === 'Путешевствия') letter.flag = 'Путешествия' // Какие данные дали, так и адаптируемся)))
    }
    /*
        if (letter.hasOwnProperty('flag')) {
            letter.flag = setFlag(letter.flag)
        }
    */
})

data.sort(sortFunctionByDate).reverse()

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    const q = url.parse(req.url, true);
    console.log(q.pathname)
    // console.log(q.path)
    const path = q.pathname.split('/');
    // console.log(path[path.length - 1])
    console.log(path[1])
    switch (path[1]) {
        case 'files': {
            // fs.readFile(`./files/attachments/${path[path.length - 1]}`, (err, data) => {
            fs.readFile(`.${q.pathname}`, (err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                }
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.write(data);
                return res.end();
            })
            break;
        }
        case 'data': {
            try {
                const myData = data[path[path.length - 1]];
                // res.setHeader('x-total-count', 200)
                // res.setHeader('hueta-count', 200)
                res.setHeader('x-total-letters-count', data.length)
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(myData));
            } catch (e) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            break;
        }
        case 'arr': {
            try {
                const myData = data.slice(0, 100);
                res.setHeader('x-total-letters-count', data.length)
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(myData));
            } catch (e) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            break;

        }
        default: {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }

    }


})

server.listen(port, hostname, () => {
    console.log(`Сервер запущен на http://${hostname}:${port}/`)
})

// data.forEach(letter => {
//
// })
