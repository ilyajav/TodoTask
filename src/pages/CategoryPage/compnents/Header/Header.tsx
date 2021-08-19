import {
    AppBar, Checkbox, Grid, LinearProgress, TextField, Toolbar, Typography,
} from '@material-ui/core';
// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {StatusType} from '../../../../store/app-reducer';

type HeaderPropsType = {
    showDone: boolean,
    status: StatusType
}

export const Header: FC<HeaderPropsType> = ({showDone, status}) => (
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
                            <Checkbox color="secondary" checked={showDone} />
                            Show done
                        </div>
                    </Grid>
                    <div>
                        <Grid item xs={10}>
                            <form>
                                <TextField
                                    id="searchForm"
                                    label="search"
                                    variant="filled"
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
