import keyMirror from 'key-mirror';

export const pages = {
  HOME: '/',
  BOOKS: '/books'
};

export const bookGenre = keyMirror({
  FICTION: null,
  PHILOSOPHY: null,
  DRAMA: null,
  HISTORY: null,
  HUMOUR: null,
  ADVENTURE: null,
  POLITICS: null
});
