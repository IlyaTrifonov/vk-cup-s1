import {folderIcons} from '../assets/icons';
import {textKeys} from '../translations';

/*
* В дальнейшем папки можно будет получать с сервера, поэтому папки вынесены в отдельный файл
* */


export const folders = {
	incoming: {icon: folderIcons.incoming_folder, name: textKeys.letterList.sidebar.incomingFolderName, path: '/inbox'},
	important: {icon: folderIcons.important_folder, name: textKeys.letterList.sidebar.importantFolderName, path: '/important',},
	sent: {icon: folderIcons.sent_folder, name: textKeys.letterList.sidebar.sentFolderName, path: '/sent'},
	drafts: {icon: folderIcons.drafts_folder, name: textKeys.letterList.sidebar.draftsFolderName, path: '/drafts'},
	archive: {icon: folderIcons.archive_folder, name: textKeys.letterList.sidebar.archiveFolderName, path: '/archive'},
	spam: {icon: folderIcons.spam_folder, name: textKeys.letterList.sidebar.spamFolderName, path: '/spam'},
	waste: {icon: folderIcons.waste_folder, name: textKeys.letterList.sidebar.wasteFolderName, path: '/waste'},
};
