const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PIC_HOSTNAME = process.env.PIC_HOSTNAME || process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 3000;

const IS_PRODUCTION = process.env.IS_PRODUCTION || false;

/*
* Блок чтения входного файла с письмами, создание папок.
* */

let hotData;
let coldData = {};

try {
  const rawData = fs.readFileSync('db.json');
  hotData = JSON.parse(rawData);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('Ошибка! Файл db.json не найден!');
  } else {
    console.error('Ошибка парсинга JSON:', err.message);
  }
  process.exit();
}

try {
  if (fs.existsSync('./files')) {
    console.log('Найдена старая папка ресурсов.');
    fs.rmSync('./files', {recursive: true});
    console.log('Старая папка ресурсов удалена.');
  } else {
    console.log('Старых папок ресурсов не обнаружено.');
  }
} catch (err) {
  console.error('Ошибка проверки папки ресурсов:', err.message);
  process.exit();
}

try {
  if (fs.existsSync('./server_statics')) {
    console.log('Папка статических ресурсов сервера найдена.');
  }
} catch (err) {
  console.error('Ошибка поиска папки статических ресурсов сервера (server_statics):', err.message);
  process.exit();
  // console.error('Внимание! Статические ресурсы не будут загружены!');
}

try {
  fs.mkdirSync('./files');
  fs.mkdirSync('./files/attachments');
  fs.mkdirSync('./files/avatars');
  fs.mkdirSync('./files/userFiles');
  console.log('Папки ресурсов созданы.');
} catch (err) {
  console.error('Ошибка создания папок ресурсов:', err.message);
  process.exit();
}


const pictureTypes = {
  attachments: 'attachments',
  avatars: 'avatars'
};


/*
* Функция создания файла вложения и возврата ссылки на этот файл
* */

let pictureNumber = 1;
const makePictureAndUrl = (image, type) => {
  const base64img = image.split(',')[1];
  const buff = Buffer.from(base64img, 'base64');
  const path = `/files/${type}/picture_${pictureNumber++}.png`;
  fs.writeFileSync(`.${path}`, buff);
  return `http://${PIC_HOSTNAME}:${PORT}/backend${path}`;
};


/*
* Функция сортировки писем по дате
* */
const sortFunctionByDate = (a, b) => {
  const dateA = Date.parse(a.date);
  const dateB = Date.parse(b.date);
  return dateA - dateB;
};


/*
* Обработка данных писем, создание файлов влжений и ссылок на них
* */

hotData.forEach((letter, index) => {
  letter.id = index;
  if (letter.hasOwnProperty('doc')) {
    const docImg = letter.doc.img;
    if (Array.isArray(docImg)) {
      const imagesUrls = [];
      docImg.forEach(image => {
        imagesUrls.push(makePictureAndUrl(image, pictureTypes.attachments));
      });
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
    });
  }
  if (letter.flag) {
    if (letter.flag === 'Путешевствия')
      letter.flag = 'Путешествия'; // Какие данные дали, так и адаптируемся)))
  }

  coldData[index] = {
    to: letter.to,
    text: letter.text
  }

  letter.text = letter.text.slice(0, 100);
  letter.to = null

});
console.log('Ресурсы созданы и помещены в папки.');
hotData.sort(sortFunctionByDate).reverse();
console.log('Письма обработаны и отсортированы.');


/*
* Создание сервера и его настройка
* */

const allowedTags = ['div', 'br', 'p', 'i', 'strike', 'b', 'u'];
const sanitize = (content) => {
  // Удаляем все тэги скриптов
  content = content.replace(/<script[^>]*>.*<\/script>/g, '');
  // Удаляем все тэги стилей
  content = content.replace(/<style[^>]*>.*<\/style>/g, '');
  // Удаляем все on* ивент хэндлеры
  content = content.replace(/ on\w+="[^"]*"/g, '');
  // Удаляем весь js
  content = content.replace(/javascript:[^"]*/g, '');
  // Удаляем все потенциально опасные тэги, кроме разрешённых
  content = content.replace(/<[\/]?(\w+)[^>]*>/g, (match, tag) => {
    if (!allowedTags.includes(tag)) {
      return '';
    }
    return match;
  });
  // Удаляем все PHP тэги
  content = content.replace(/<\?(?!xml)([\s\S]*?)\?>/g, '');
  content = content.replace(/<\?(?!xml)/g, '&lt;?');

  return content;
};

const htmlToText = (htmlString) => {
  return htmlString.replace(/<[^>]+>/g, '');
};

// Папки на клиенте
const folders = {
  inbox: 'Входящие',
  important: 'Важное',
  sent: 'Отправленные',
  drafts: 'Черновики',
  archive: 'Архив',
  spam: 'Спам',
  waste: 'Корзина'
};

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
  res.setHeader('Access-Control-Allow-Methods', '*');

  console.log('');
  console.log(`Request (${req.method}):`, req.url);

  const parsedURL = url.parse(req.url, true);
  console.log('Request:', parsedURL.path);


  const pathL = parsedURL.pathname.split('/');
  console.log('path:', pathL);

  const newPathArr = parsedURL.pathname.split('/').slice(1);

  if (IS_PRODUCTION && !req.url.includes('/backend')) {
    console.log('Обращение к фронтенду');
    let filePath = '.' + req.url;
    if (routes.includes(req.url) || (req.url.includes('/letter'))) {
      filePath = './index.html';
    }
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'octet-stream';

    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.readFile('./404.html', function (error, content) {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
          });
        } else {
          res.writeHead(500);
          res.end('Ошибка сервера: ' + error.code + ' ..\n');
          res.end();
        }
      } else {
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content, 'utf-8');
      }
    });
  }

  if (newPathArr[0] === 'backend') {
    console.log('Обращение к бэкенду');
    const path1 = newPathArr[1];
    if (Object.keys(folders).includes(path1)) {
      try {
        const offset = parseInt(parsedURL.query.offset);
        const limit = parseInt(parsedURL.query.limit);

        const isUnread = parseInt(parsedURL.query.isUnread);
        const isFlagged = parseInt(parsedURL.query.isFlagged);
        const isWithAttachment = parseInt(parsedURL.query.isWithAttachment);
        console.log('DEBUG!');
        console.log('isUnread', isUnread);
        console.log('isFlagged', isFlagged);
        console.log('isWithAttachment', isWithAttachment);


        let myData = [];
        res.setHeader('x-folder', path1);
        // В папку входящие(inbox) попадают все письма у которых нет поля folder
        if (path1 === 'inbox') {
          myData = hotData.filter(letter => !letter.hasOwnProperty('folder'));
        } else {
          myData = hotData.filter(letter => letter.folder === folders[path1]);
        }

        if (isUnread) {
          console.log('Выбрали только непрочитанные');
          console.log(isUnread);
          console.log(typeof isUnread);
          myData = myData.filter(letter => letter.read === false);
        }
        if (isFlagged) {
          console.log('Выбрали только с букмарком');
          myData = myData.filter(letter => letter.bookmark === true);
        }
        if (isWithAttachment) {
          console.log('Выбрали только с вложением');
          myData = myData.filter(letter => letter.hasOwnProperty('doc'));
        }

        res.setHeader('x-total-letters-count', myData.length);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(myData.slice(offset, limit + offset)));
      } catch (e) {
        console.log('Not Found');
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end('404 Not Found');
      }
    } else {
      switch (newPathArr[1]) {
      case 'files': {
        fs.readFile(`.${parsedURL.pathname.replace('/backend', '')}`, (err, data) => {
          if (err) {
            console.log('Not Found');
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found');
          }
          const fileStats = fs.statSync(`.${parsedURL.pathname.replace('/backend', '')}`);
          res.setHeader('x-total-size-in-bytes', fileStats.size);
          res.writeHead(200, {'Content-Type': 'image/png'});
          res.write(data);
          return res.end();
        });
        break;
      }
        // http://127.0.0.1:3000/backend/files/attachments/picture_303.png
        // http://127.0.0.1:3000/backend/server_statics/pictures/anime_theme_background.png
        // /backend/server_statics/pictures/anime_theme_background.png
        // Расположение относительно сервера
      case 'server_statics': {
        const filePath = parsedURL.pathname.replace('/backend', '');
        fs.readFile(`.${filePath}`, (err, data) => {
          if (err) {
            console.log('Not Found');
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found');
          }
          const fileStats = fs.statSync(`.${filePath}`);
          res.setHeader('x-total-size-in-bytes', fileStats.size);
          res.writeHead(200, {'Content-Type': 'image/png'});
          res.write(data);
          return res.end();
        });
        break;
      }
        // /backend/api/save-letter
      case 'api': {
        if (req.method === 'POST' && req.url === '/backend/api/save-letter') {
          try {
            let body = '';

            req.on('data', chunk => {
              body += chunk.toString();
            });

            req.on('end', async () => {
              let letterData = JSON.parse(body);

              const decoder = new TextDecoder();
              letterData = {
                ...letterData,
                title: sanitize(decoder.decode(new Uint8Array(Object.values(letterData.title)).buffer)),
                text: sanitize(decoder.decode(new Uint8Array(Object.values(letterData.text)).buffer)),
              }

              const letterIndex = hotData.length;
              letterData = {...letterData, id: letterIndex}

              coldData[letterIndex] = {
                to: letterData.to,
                text: letterData.text,
              }

              letterData = {
                ...letterData,
                to: null,
                text: htmlToText(letterData.text).slice(0, 100),
              }

              hotData.push(letterData);
              hotData.sort(sortFunctionByDate).reverse();

              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({status: 'success'}));
            });
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end();
          }
        } else {
          res.statusCode = 404;
          res.end();
        }
        break;
      }
      case 'letter': {
        const letterNumber = newPathArr[2];
        console.log('Letter number: ', letterNumber);
        let letter = null;
        hotData.forEach(dataLetter => {
          if (dataLetter.id.toString() === letterNumber) {
            letter = dataLetter;
          }
        });
        if (!letter) {
          console.log('Not Found');
          console.log('Всего писем', data.length);
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end('404 Not Found');
        }

        letter = {
          ...letter,
          to: coldData[letter.id].to,
          text: coldData[letter.id].text,
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(letter));
        break;
      }
      default: {
        console.log('Not Found');
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end('404 Not Found');
      }
      }
    }
  }

});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Сервер запущен на http://${HOSTNAME}:${PORT}/`);
});

