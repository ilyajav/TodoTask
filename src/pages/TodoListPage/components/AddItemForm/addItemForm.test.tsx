import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {AddItemForm} from './AddItemForm';
import {category1Id} from '../../../../store/category-reducer';

const onAddCategory = (title: string) => title;

const styles = {
    addItemCategory: {
        padding: '90px 20px 20px 150px',
    },
};

describe('AddItemForm component', () => {
    it('renders AddItemForm Component', () => {
        const {getByTestId} = render(<AddItemForm
            formText="add new todo"
            addItem={onAddCategory}
            categoryId={category1Id}
            addStyle={styles.addItemCategory}
        />);
        screen.debug();
        const title = getByTestId('change-title') as HTMLInputElement;

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(title.value).toBe('');
    });

    it('AddItemForm snapshot', () => {
        const form = render(<AddItemForm
            formText="add new todo"
            addItem={onAddCategory}
            categoryId={category1Id}
            addStyle={styles.addItemCategory}
        />);

        expect(form).toMatchSnapshot();
    });

    it('title must be changed in AddItemForm', () => {
        const {getByTestId} = render(<AddItemForm
            formText="add new todo"
            addItem={onAddCategory}
            categoryId={category1Id}
            addStyle={styles.addItemCategory}
        />);
        const title = getByTestId('change-title') as HTMLInputElement;
        const button = getByTestId('title-delete-submit');
        userEvent.type(screen.getByTestId('change-title'), 'React');

        expect(title.value).toBe('React');

        userEvent.click(button);

        expect(title.value).toBe('');
    });

    it('Enter must be worked', () => {
        const {getByTestId} = render(<AddItemForm
            formText="add new todo"
            addItem={onAddCategory}
            categoryId={category1Id}
            addStyle={styles.addItemCategory}
        />);

        const title = getByTestId('change-title') as HTMLInputElement;
        userEvent.type(title, 'React');

        expect(title.value).toBe('React');

        fireEvent.keyPress(title, {charCode: 13});

        expect(title.value).toBe('');
    });
});
