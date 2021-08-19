// eslint-disable-next-line no-use-before-define
import React, {ChangeEvent, FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, IconButton, TextField} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import {changeCategoryTitle, removeCategory} from '../store/category-reducer';

type EditablePropsType = {
    itemTitle: string
    id: string
}

export const EditableSpan: FC<EditablePropsType> = (
    {itemTitle, id}
) => {
    const [title, setTitle] = useState<string>(itemTitle);
    const [editTitle, setEditTitle] = useState<boolean>(false);

    const dispatch = useDispatch();

    const onShowEdit = () => {
        setEditTitle(true);
    };

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value);
    };
    const changeDataTitle = () => {
        dispatch(changeCategoryTitle(id, title));
        setEditTitle(false);
    };
    const cancelChangeTitle = () => {
        setEditTitle(false);
        setTitle(itemTitle);
    };
    const RemoveCategory = () => {
        dispatch(removeCategory(id));
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
                            <Link to={`?categoryId=${id}`}>{itemTitle}</Link>
                            <IconButton color="primary" onClick={onShowEdit}>
                                <CreateIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={RemoveCategory}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )
            }
        </>
    );
};
