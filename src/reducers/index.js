import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import actionTypes from '../constants/action-types';
import {bookGenre} from '../constants/project-constants';

function mainReducer(state = {
  bookGenre: bookGenre.FICTION
}, action = {type: ''}) {
  switch (action.type) {
    case actionTypes.BOOKS_APP_SELECT_BOOK_GENRE:
      return Object.assign({}, state, {
        bookGenre: action.genre
      })
    default:
      return state
  }
}

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history), mainReducer
});

export default createRootReducer;
