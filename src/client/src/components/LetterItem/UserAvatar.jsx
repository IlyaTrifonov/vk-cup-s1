import React from 'react';

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