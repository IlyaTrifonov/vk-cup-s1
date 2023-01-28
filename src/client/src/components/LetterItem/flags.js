import {categoryIcons} from '../../assets/icons';
import {textKeys} from '../../translations';

/**
 * Список флагов писем для адаптации данных, приходящих с бэкенда.
 */
export const flags = {
	'Заказы': {icon: categoryIcons.shopping_cart, name: textKeys.common.letterCategories.orders},
	'Финансы': {icon: categoryIcons.money_ruble, name: textKeys.common.letterCategories.finances},
	'Регистрации': {icon: categoryIcons.key_outline, name: textKeys.common.letterCategories.registration},
	'Путешествия': {icon: categoryIcons.plane_outline, name: textKeys.common.letterCategories.travels},
	'Билеты': {icon: categoryIcons.ticket_outline, name: textKeys.common.letterCategories.tickets},
	'Штрафы и налоги': {icon: categoryIcons.government_outline, name: textKeys.common.letterCategories.government},
};
