import {
    AppBar,
    Checkbox,
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

export const Header = () => {
    const history = useHistory();
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        if (searchText) {
            history.push(`?searchText=${searchText}`);
        } else {
            history.push('/todos');
        }
    }, [searchText, history]);

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
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
                                <Checkbox onChange={onChangeStatus} />
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
        </div>
    );
};
