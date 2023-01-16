import React from 'react';

/**
 * Компонент пользовательского аватара. Используется для отображения аватара отправителя письма.
 * Используется в списке писем и в письме.
 * @param avatar
 * @param isHidden
 * @returns {JSX.Element}
 * @constructor
 */
const UserAvatar = ({avatar, isHidden}) => {
    return (
        <div className={`user-avatar ${isHidden ? 'hide-avatar' : ''}`}>
            {avatar ?
                <img className="user-avatar__avatar" src={avatar} alt="Аватар"/>
                :
                <img className="user-avatar__avatar" src="https://vk.com/images/camera_200.png" alt=""/>
            }
        </div>
    );
};

export default UserAvatar;