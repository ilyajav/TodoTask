import {
    AppBar, Grid, LinearProgress, TextField, Toolbar, Typography,
} from '@material-ui/core';
// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {useHistory} from 'react-router-dom';
import {StatusType} from '../../../../store/app-reducer';

type HeaderPropsType = {
    status: StatusType
}

export const Header: FC<HeaderPropsType> = ({status}) => {
    const history = useHistory();

    const onChange = (e: React.MouseEvent<HTMLInputElement>) => {
        history.push(`?showDone=${e.currentTarget.checked}`);
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
};
