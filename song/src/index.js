import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './component/App';
import reducer from './reducers';


ReactDOM.render(
  <React.StrictMode >
    <Provider store={createStore(reducer)}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
