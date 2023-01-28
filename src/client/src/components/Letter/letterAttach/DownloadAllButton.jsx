import React, {useContext} from 'react';
import {LanguageContext} from '../../../context/LanguageContext';

const DownloadAllButton = ({urls}) => {

	// const [isLoading, setIsLoading] = useState(false);

	const {language} = useContext(LanguageContext);

	const downloadAllLetterAttachments = async () => {
		// setIsLoading(true)
		try {
			/*
			const promises = urls.map((url) => fetch(url).then((response) => response.blob()));
			const files = await Promise.all(promises);
			files.forEach((file, index) => {
			const url = window.URL.createObjectURL(file);
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', `letter_file_${index + 1}.png`);
							// document.body.appendChild(link);
							link.click();
							link.remove();
						});
			*/
			urls.map(url => {
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', url.split('/').pop());
				// link.setAttribute('target', '_blank');
				link.click();
				link.remove();
			});

		} catch (error) {
			console.error(error);
		} /*finally {
            setIsLoading(false)
        }*/
	};

	/*
		if (isLoading) {
			return (
				<div className="attachments-action__download__button">
					Идёт загрузка
				</div>
			)
		}
	*/

	return (
		<div className="attachments-action__download__button"
			 onClick={downloadAllLetterAttachments}>
			{language.letterPage.attachments.downloadButtonName}
		</div>
	);
};

export default DownloadAllButton;
