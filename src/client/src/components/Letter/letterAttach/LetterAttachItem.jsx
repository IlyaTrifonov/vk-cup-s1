import React, {useContext} from 'react';
import Icons from "../../../assets/icons/Icons";
import {uiIcons} from "../../../assets/icons";
import {LanguageContext} from "../../../context/LanguageContext";

const LetterAttachItem = ({children, url}) => {

    /*
        const handleClick = async () => {
            try {
                const response = await fetch(url);
                const headers = new Headers(response.headers);
                headers.set('Content-Type', 'application/image/png');
                const newResponse = new Response(
                    response.body,
                    {
                        status: response.status,
                        statusText: response.statusText, headers
                    });
                const blob = await newResponse.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = url.split('/').pop();
                link.click();
                link.remove();
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <div className="attachments__previews__attach" onClick={handleClick}>
                {children}
            </div>
        );
    */

    const {language} = useContext(LanguageContext);

    return (
        <a className="attachments__previews__attach"
           href={url}
           target="_blank"
           download
        >
            {children}
            <div className="attachments__previews__attach__overlay">
                <div className="overlay-button">
                    <Icons name={uiIcons.download_alt}
                           width="16"
                           height="16"
                           className="overlay-button__icon"/>
                    <div className="overlay-button__text">{language.letterPage.attachments.downloadButtonName}</div>
                </div>
                <div className="overlay-button__background"/>
            </div>
        </a>
    )
};

export default LetterAttachItem;