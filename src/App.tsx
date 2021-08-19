// eslint-disable-next-line no-use-before-define
import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {routers} from './app-routes';
import {store} from './store/store';

export const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <div className="App">
                {routers}
            </div>
        </Provider>
    </BrowserRouter>
);
