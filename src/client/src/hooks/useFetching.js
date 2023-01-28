import {useState} from 'react';

/**
 * Универсальный хук для получения данных. Помогает отслеживать статус загрузки и ошибку.
 * @param callback
 * @returns {[((function(...[*]): Promise<void>)|*),boolean,string]}
 */
export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
