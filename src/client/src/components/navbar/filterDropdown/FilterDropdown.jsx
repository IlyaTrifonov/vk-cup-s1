import React, {useEffect} from 'react';
import './FilterDropdown.sass';
import FilterDropdownItem from './FilterDropdownItem';

/**
 * Компонент дропдауна фильтров. Используется для выбора фильтрации.
 * На данный момент функционал неполный.
 * @param coords
 * @param updateDropdownCoords
 * @param closeDropdown
 * @param filters
 * @returns {JSX.Element}
 * @constructor
 */
const FilterDropdown = ({
	coords,
	updateDropdownCoords, closeDropdown,
	filters,
}) => {

	useEffect(() => {
		window.addEventListener('resize', updateDropdownCoords);
		return () => {
			window.removeEventListener('resize', updateDropdownCoords);
		};
	}, []);

	return (
		<div style={{...coords}} className="filter-dropdown">
			{Object.entries(filters).map((filter, index) =>
				<FilterDropdownItem filter={filter} key={index}/>,
			)}
		</div>
	);
};

export default FilterDropdown;
