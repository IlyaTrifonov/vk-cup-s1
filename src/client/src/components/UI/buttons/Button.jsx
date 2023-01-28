import React from 'react';
import Icons from '../../../assets/icons/Icons';
import './Button.sass';

export const buttonTypes = {
	default: 'default',
	flat: 'flat',
	burger: 'burger',
};

/**
 * Универсальный элемент кнопки.
 * @param children
 * @param className
 * @param icon
 * @param iconSize
 * @param type
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Button = ({children, className, icon, iconSize, type, ...props}) => {

	const buttonType = type ? type : buttonTypes.default;

	return (
		<button className={`button ${buttonType}`} {...props}>
			{
				icon ?
					<Icons
						name={icon}
						width={iconSize ? iconSize : '20'}
						height={iconSize ? iconSize : '20'}
						className={className ? className : 'button__icon'}
					/>
					:
					null
			}
			<div className="button__text">{children}</div>
		</button>
	);
};

export default Button;
