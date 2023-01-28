export default class ServerStaticsService {
	static url = import.meta.env.VITE_API_URL;
	static animeBackgroundImage = `${ServerStaticsService.url}/backend/server_statics/pictures/anime_theme_background.png`;
	static animeBackgroundThumbnail = `${ServerStaticsService.url}/backend/server_statics/pictures/anime_theme_preview.png`;
	static emptyLetterListDarkPicture = `${ServerStaticsService.url}/backend/server_statics/pictures/emptyLetterListDark.png`;
	static emptyLetterListLightPicture = `${ServerStaticsService.url}/backend/server_statics/pictures/emptyLetterListLight.png`;
}
