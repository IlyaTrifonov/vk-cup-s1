import {folderIcons} from "../../assets/icons";

export const folders = [
    {icon: folderIcons.incoming_folder, name: 'Входящие', route: '/inbox'},
    {icon: folderIcons.important_folder, name: 'Важное', route: '/important'},
    {icon: folderIcons.sent_folder, name: 'Отправленные', route: '/sent'},
    {icon: folderIcons.drafts_folder, name: 'Черновики', route: '/drafts'},
    {icon: folderIcons.archive_folder, name: 'Архив', route: '/archive'},
    {icon: folderIcons.spam_folder, name: 'Спам', route: '/spam'},
    {icon: folderIcons.waste_folder, name: 'Корзина', route: '/waste'}
]
