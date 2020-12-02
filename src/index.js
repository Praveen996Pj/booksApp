import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/app-routes';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import { Router } from 'react-router';

const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(
    routerMiddleware(history),
    thunk
  ))
);

ReactDOM.render(
	<Provider store = {store}>
		<Router
			history = {history}
			basename = '/'
		>
      <AppRoutes />
		</Router>
	</Provider>,
	document.getElementById('root')
);
