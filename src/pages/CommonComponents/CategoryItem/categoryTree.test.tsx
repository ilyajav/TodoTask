import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {CategoryTree} from '../CategoryTree';
import {store} from '../../../store/store';

test('1', () => {
    render(
        <MemoryRouter>
            <Provider store={store}>
                <CategoryTree mode="show" todoId="1" />
            </Provider>
        </MemoryRouter>
    );
    screen.debug();
});
