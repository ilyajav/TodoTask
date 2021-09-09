import {
    AppBar,
    Checkbox,
    Container,
    Grid,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import React, {
    ChangeEvent,
    useEffect,
    useState,
} from 'react';
import {useHistory} from 'react-router-dom';

import {
    ROUTING_PARAMS,
    ROUTING_PATHS,
} from '../../../../App.constants';

import style from './Header.module.css';

type HeaderProps = {
    categoryId: string | null,
}

export const Header = ({categoryId}: HeaderProps) => {
    const history = useHistory();
    const [searchText, setSearchText] = useState<string>('');
    const [checked, setChecked] = useState(false);

    const category = `${ROUTING_PARAMS.CATEGORY_ID}${categoryId}`;
    const filter = `${ROUTING_PARAMS.TODO_SEARCH}${searchText}`;
    const show = `${ROUTING_PARAMS.TODO_SHOW_DONE}${checked}`;

    const onChangeStatus = () => {
        setChecked(!checked);
    };
    const onSearchChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchText(e.currentTarget.value);
    };

    useEffect(() => {
        history.push({
            pathname: ROUTING_PATHS.TODO_LIST_PAGE_ROUTE,
            search: `?${category}&${show}&${filter}`,
        });
    }, [history, show, category, filter]);

    useEffect(() => {
        if (categoryId === 'null') {
            history.push(`${ROUTING_PATHS.TODO_LIST_PAGE_ROUTE}`);
        }
        setChecked(false);
        setSearchText('');
    }, [categoryId, history]);

    return (
        <>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar>
                        <Typography variant="h6">
                            TodoList
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                            justifyContent="flex-end"
                        >
                            <Grid item xs={2}>
                                <div>
                                    <Checkbox
                                        checked={checked}
                                        onChange={onChangeStatus}
                                        disabled={!categoryId}
                                    />
                                    <span className={categoryId ? '' : style.item}>Show done</span>
                                </div>
                            </Grid>
                            <div>
                                <Grid item xs={10}>
                                    <form>
                                        <TextField
                                            id="searchForm"
                                            label="search"
                                            color="secondary"
                                            variant="filled"
                                            value={searchText}
                                            onChange={onSearchChange}
                                            disabled={!categoryId}
                                        />
                                    </form>
                                </Grid>
                            </div>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};
