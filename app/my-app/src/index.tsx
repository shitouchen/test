import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.less';
import {AppStateProvider} from './AppState';

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
    <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
