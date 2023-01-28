import React, {useEffect, useRef, useState} from 'react';
import AttachDropdownItem from './AttachDropdownItem';
import './AttachDropdown.sass';

/**
 * Дропдаун-поповер для отображения списка вложений в письмо на экране списка писем.
 * @param attachments
 * @param coords
 * @param updateDropdownCoords
 * @param closeDropdown
 * @returns {JSX.Element}
 * @constructor
 */
const AttachDropdown = ({
	attachments,
	coords,
	updateDropdownCoords, closeDropdown,
}) => {
	const parentContainer = document.getElementById('letter-list-id');
	useEffect(() => {
		window.addEventListener('resize', updateDropdownCoords);
		parentContainer.addEventListener('scroll', closeDropdown);
		return () => {
			window.removeEventListener('resize', updateDropdownCoords);
			parentContainer.removeEventListener('scroll', closeDropdown);
		};
	}, []);

	const parentDropdown = useRef();
	const [newCoords, setNewCoords] = useState({});

	const updateMyCoords = (ref) => {
		// console.log('Обновление координат')
		const rect = ref.getBoundingClientRect();
		setNewCoords({
			left: rect.x,
			top: rect.y + rect.height,
		});
	};

	useEffect(() => {
		if (parentDropdown.current)
			updateMyCoords(parentDropdown.current);
	}, [parentDropdown]);

	return (
		<div
			style={{...coords}}
			className="attach-dropdown-overlay"
			ref={parentDropdown}
		>
			{attachments && attachments.map((attach, index) =>
				<AttachDropdownItem attach={attach}
					key={index}
					newCoords={newCoords}
					updateCoords={() => updateMyCoords(parentDropdown.current)}/>,
			)}
		</div>
	);
};

export default AttachDropdown;
