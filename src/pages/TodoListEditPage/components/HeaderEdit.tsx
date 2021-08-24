import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';
import React from 'react';

import style from './Header.module.css';

type HeaderProps = {
    title: string,
}

export const HeaderEdit = ({title}: HeaderProps) => (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <span className={style.title}>{title}</span>
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
);
