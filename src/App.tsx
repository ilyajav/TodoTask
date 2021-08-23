import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {routers} from './Routes';
import {store} from './store/store';

import './App.css';

export const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <div className="App">
                {routers}
            </div>
        </Provider>
    </BrowserRouter>
);
