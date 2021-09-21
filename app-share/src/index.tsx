import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DevTools,loadServer} from 'jira-dev-tool';
import { AppProvider } from './context';

loadServer(() => ReactDOM.render(
  <React.StrictMode>
    <AppProvider >
      <DevTools />
    <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
)

reportWebVitals();
