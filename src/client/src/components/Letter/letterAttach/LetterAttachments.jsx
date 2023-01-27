import React, {useContext, useEffect, useState} from 'react';
import LetterAttachItem from "./LetterAttachItem";
import AttachmentService from "../../../api/AttachmentService";
import {LanguageContext} from "../../../context/LanguageContext";
import DownloadAllButton from "./DownloadAllButton";

const LetterAttachments = ({attachments}) => {

    const {language} = useContext(LanguageContext);

    const [urls, setUrls] = useState([])

    useEffect(() => {
        const attachmentsURLs = []
        attachments.map(attach => attachmentsURLs.push(attach.url))
        setUrls(attachmentsURLs)
    }, [attachments])

    const attachmentsSize = AttachmentService.getHumanFileSize(
        attachments.reduce(
            (accumulator, currentValue) =>
                accumulator + Number.parseInt(currentValue.size),
            0
        )
    );

    return (
        <div className="attachments">
            <div className="attachments__previews">
                {attachments.map(attach =>
                    <LetterAttachItem url={attach.url} key={attach.name}>
                        <img className="attach__img" src={attach.url} alt="Вложение"/>
                    </LetterAttachItem>
                )}
            </div>
            <div className="attachments__action">
                <div className="attachments-action__count">
                    {attachments.length === "1"
                        ? `${attachments.length} ${language.letterPage.attachments.severalFileWord}`
                        : `1 ${language.letterPage.attachments.oneFileWord}`}
                </div>
                <div className="attachments-action__download">
                    <DownloadAllButton urls={urls}/>
                    <div className="attachments-action__download__size">
                        {attachmentsSize}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LetterAttachments;