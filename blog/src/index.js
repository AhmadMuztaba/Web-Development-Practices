import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import App from './component/App';
import reducers from './reducers';

ReactDOM.render(
  <React.StrictMode >
    <Provider store={createStore(reducers,applyMiddleware(thunk))}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
