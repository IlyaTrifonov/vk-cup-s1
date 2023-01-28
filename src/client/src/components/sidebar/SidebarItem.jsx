import React from 'react';
import Icons from '../../assets/icons/Icons';
import './SidebarItem.sass';

/**
 * Универсальный элемент сайдбара почты. В данный момент используется для отображения кнопки настроек.
 * @param children
 * @param icon
 * @param className
 * @param onClick
 * @param selectedFolder
 * @param folderName
 * @returns {JSX.Element}
 * @constructor
 */
const SidebarItem = ({children, icon, className, onClick, selectedFolder, folderName}) => {
	const active = selectedFolder ? selectedFolder === folderName ? 'active' : '' : '';
	return (
		<button className={`sidebar-item ${active}`} onClick={onClick}>
			<Icons
				name={icon}
				width="20"
				height="20"
				className={className ? className : 's_icon'}
			/>
			<span className="sidebar-item__text">{children}</span>
		</button>
	);
};

export default SidebarItem;
