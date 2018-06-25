import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import configStore from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const { store, history } = configStore();
const root = (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
