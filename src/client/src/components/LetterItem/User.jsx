import React from 'react';

const User = ({author}) => {
    
    return (
        <div className="user">
            <div className="avatar">
                {/*<img src={author.avatar} alt=""/>*/}
            </div>
            <div className="name">
                <span>{author.name} {author.surname}</span>
            </div>
        </div>
    );
};

export default User;