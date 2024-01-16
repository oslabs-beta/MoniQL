import React from 'react';
import App from './App';
import ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <Provider store={ store }>
    <App />
  </Provider>  
);

