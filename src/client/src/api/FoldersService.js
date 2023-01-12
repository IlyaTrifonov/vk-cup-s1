import {folderIcons} from "../assets/icons";

/*
* В дальнейшем папки можно будет получать с сервера, поэтому папки вынесены в отдельный файл
* */


export const folders = {
    incoming: {icon: folderIcons.incoming_folder, name: 'Входящие', path: '/inbox'},
    important: {icon: folderIcons.important_folder, name: 'Важное', path: '/important'},
    sent: {icon: folderIcons.sent_folder, name: 'Отправленные', path: '/sent'},
    drafts: {icon: folderIcons.drafts_folder, name: 'Черновики', path: '/drafts'},
    archive: {icon: folderIcons.archive_folder, name: 'Архив', path: '/archive'},
    spam: {icon: folderIcons.spam_folder, name: 'Спам', path: '/spam'},
    waste: {icon: folderIcons.waste_folder, name: 'Корзина', path: '/waste'}
}