export const getDateString = (date) => {
    const nowDate = new Date()
    const letterDate = new Date(date)
    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]

    if (nowDate.toLocaleDateString() === letterDate.toLocaleDateString()) {
        return letterDate.toLocaleTimeString().slice(0, -3);
    }
    if (nowDate.getFullYear() === letterDate.getFullYear()) {
        return `${letterDate.getDate()} ${months[letterDate.getMonth()].slice(0, 3).toLowerCase()}`
    } else {
        const date = letterDate.toLocaleDateString()
        return `${date.slice(0,6)}${date.slice(-2,)}`
    }
}