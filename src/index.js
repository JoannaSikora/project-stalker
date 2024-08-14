import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import 'normalize.css';
import './index.scss';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './state/reducers/rootReducer';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
