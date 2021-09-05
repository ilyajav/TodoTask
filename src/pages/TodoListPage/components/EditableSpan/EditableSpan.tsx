import React,
{
    ChangeEvent,
    useState,
} from 'react';
import {
    Button,
    IconButton,
    TextField,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {Link} from 'react-router-dom';

import {ROUTING_PARAMS} from '../../../../App.constants';

import style from './EditableSpan.module.css';

type EditableProps = {
    itemTitle: string
    id: string
    onChangeCategoryTitle: (id: string, title: string) => void;
    categoryId: string | null,
}

export const EditableSpan = (
    {
        itemTitle,
        id,
        onChangeCategoryTitle,
        categoryId,
    }: EditableProps
) => {
    const [title, setTitle] = useState<string>(itemTitle);
    const [editTitle, setEditTitle] = useState<boolean>(false);

    const onShowEdit = () => {
        setEditTitle(true);
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value);
    };
    const changeDataTitle = () => {
        onChangeCategoryTitle(id, title);
        setEditTitle(false);
    };
    const cancelChangeTitle = () => {
        setEditTitle(false);
        setTitle(itemTitle);
    };
    return (
        <>
            {
                editTitle
                    ? (
                        <>
                            <TextField
                                id="change item title"
                                label="change category name"
                                value={title}
                                onChange={onChangeTitle}
                            />
                            <div>
                                <Button onClick={changeDataTitle}>Change</Button>
                                <Button onClick={cancelChangeTitle}>Cancel</Button>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <span className={categoryId === id ? style.link : ''}>
                                <Link to={`/todos?${ROUTING_PARAMS.CATEGORY_ID}${id}`}>{itemTitle}</Link>
                            </span>
                            <IconButton color="primary" onClick={onShowEdit}>
                                <CreateIcon />
                            </IconButton>
                        </>
                    )
            }
        </>
    );
};
