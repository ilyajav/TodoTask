import {
    AppBar, Grid, LinearProgress, TextField, Toolbar, Typography,
} from '@material-ui/core';
// eslint-disable-next-line no-use-before-define
import React, {
    ChangeEvent, FC, useEffect, useState,
} from 'react';
import {useHistory} from 'react-router-dom';
import {StatusType} from '../../../../store/app-reducer';

type HeaderPropsType = {
    status: StatusType
}

export const Header: FC<HeaderPropsType> = ({status}) => {
    const history = useHistory();
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        if (searchText) {
            history.push(`?searchText=${searchText}`);
        } else {
            history.push('/todos');
        }
    }, [searchText]);

    const onChange = (e: React.MouseEvent<HTMLInputElement>) => {
        history.push(`?showDone=${e.currentTarget.checked}`);
    };
    const onSearchChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newText = e.currentTarget.value;
        setSearchText(newText);
    };

    return (
        <div className="App">
            <AppBar position="static">
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
                                <input type="checkbox" onClick={onChange} />
                                Show done
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
                                    />
                                </form>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary" />}
        </div>
    );
};
