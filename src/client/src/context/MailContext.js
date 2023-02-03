import React from 'react';

export const noFilterKey = 'noFilter';

export const initialComposeContent =
  '<div>Hello world!</div>\n' +
  '<div><br/></div>\n' +
  '<div><br/></div>\n' +
  '<div>——</div>\n' +
  '<div>Илья Трифонов</div>\n' +
  '<div>ilya.trifonov.official@vk.com</div>\n' +
  '<div>Отправлено из почты VK Cup</div>';

export const initialComposeLetterState = {
  recipients: [],
  subject: '',
  attachments: [],
  content: initialComposeContent,
};

export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const MailContext = React.createContext({});
