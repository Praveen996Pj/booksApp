import actionTypes from '../constants/action-types';
import {pages} from '../constants/project-constants';
import {push} from 'connected-react-router';

export function selectBookGenre(genre) {
  return {
    type: actionTypes.BOOKS_APP_SELECT_BOOK_GENRE,
    genre
  }
}

export function goToHome() {
  return push(pages.HOME);
}

export function goToBooksPage() {
  return push(pages.BOOKS);
}

export function onGenreClick(genre) {
  return dispatch => {
    dispatch(selectBookGenre(genre));
    dispatch(goToBooksPage());
  }
}
