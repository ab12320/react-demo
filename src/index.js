import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
	<Provider store={store}>
	{/*<Auth0Provider*/}
	{/*domain="dev-y0rvrh6m.eu.auth0.com"*/}
	{/*clientId="e7TPaMzPL91SQWc6RoCZV7rm1idcYidl"*/}
	{/*redirectUri={window.location.origin}>*/}
	<App />
		{/*<Auth0Provider/>*/}
	</Provider>
	</React.StrictMode>,
	document.getElementById('root')
	);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
