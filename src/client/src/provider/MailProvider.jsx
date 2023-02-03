import React, {useContext, useEffect, useState} from 'react';
import {MailContext, noFilterKey} from '../context/MailContext';
import {useFetching} from '../hooks/useFetching';
import MailService from '../api/MailService';
import {bookmarkIcons, uiIcons} from '../assets/icons';
import {LanguageContext} from '../context/LanguageContext';

const MailProvider = ({children}) => {

  const {language} = useContext(LanguageContext);

  const filtersInit = {
    noFilter: {
      value: true,
      icon: undefined,
      name: language.letterList.filter.allLettersFilterName,
    },
    isUnread: {
      value: false,
      icon: uiIcons.read_on_mark,
      name: language.letterList.filter.unreadFilterName,
    },
    isFlagged: {
      value: false,
      icon: bookmarkIcons.bookmark,
      name: language.letterList.filter.withFlagFilterName,
    },
    isWithAttachment: {
      value: false,
      icon: uiIcons.attach,
      name: language.letterList.filter.withAttachmentFilterName,
    },
  };

  const [filters, setFilters] = useState(filtersInit);

  const setFilterByName = (filterName) => {
    if (filterName === noFilterKey) {
      setFilters(filtersInit);
      return;
    }
    const newState = {
      ...filters,
      noFilter: {
        ...filters.noFilter,
        value: false,
      },
      [filterName]: {
        ...filters[filterName],
        value: !filters[filterName].value,
      },
    };
    if (!(newState.noFilter.value || newState.isUnread.value ||
      newState.isFlagged.value || newState.isWithAttachment.value)) {
      setFilters(filtersInit);
      return;
    }
    setFilters(newState);
  };

  const selectedFilters = [];
  Object.entries(filters).filter(([filterKey, params]) =>
    params.value === true && filterKey !== noFilterKey)
    .map(([_, params]) =>
      selectedFilters.push(params.name));

  let filterButtonName = language.letterList.filter.filterButtonName;
  if (selectedFilters.length === 1)
    filterButtonName = selectedFilters[0];
  if (selectedFilters.length > 1)
    filterButtonName = language.letterList.filter.filterButtonNameSeveral;

  const [letters, setLetters] = useState([]);


  const [limit, setLimit] = useState(20);
  const [isNoMoreLetters, setIsNoMoreLetters] = useState(false);


  const [fetchLetters, isLettersLoading, lettersError] = useFetching(async (folder, filtersValues, isClear) => {
    if (isClear) {
      const response = await MailService.getLettersFromFolder(folder, limit, 0, filtersValues);
      const lettersTotalCount = response.headers.get('x-total-letters-count');
      const data = await response.json();

      // console.log(data.length.toString(), lettersTotalCount, data.length.toString() === lettersTotalCount);
      setIsNoMoreLetters(data.length.toString() === lettersTotalCount);
      setLetters(data);
    } else {
      const response = await MailService.getLettersFromFolder(folder, limit, letters.length, filtersValues);
      const lettersTotalCount = response.headers.get('x-total-letters-count');
      const data = await response.json();

      // console.log((letters.length + data.length).toString(), lettersTotalCount, (letters.length + data.length).toString() === lettersTotalCount);
      setIsNoMoreLetters((letters.length + data.length).toString() === lettersTotalCount);
      setLetters([...letters, ...data]);
    }
  });

  /**
   * Функция вызова фетча писем.
   * @param {string} folder - папка
   * @param {boolean} isClear - сделать фетч с нуля
   */
  const getLetters = (folder, isClear) => {
    const filtersValues = {};
    Object.entries(filters).filter(([filterKey, _]) =>
      filterKey !== noFilterKey)
      .map(([filterKey, params]) =>
        filtersValues[filterKey] = params.value);
    fetchLetters(folder, filtersValues, isClear);
  };

  useEffect(() => {
    setFilters(filtersInit);
  }, [language]);

  return (
    <MailContext.Provider
      value={{letters, getLetters, filters, setFilterByName, filterButtonName, isNoMoreLetters, isLettersLoading}}
    >
      {children}
    </MailContext.Provider>
  );
};

export default MailProvider;
