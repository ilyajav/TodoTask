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
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';

import {ROUTING_PARAMS} from '../../../../App.constants';

type EditableProps = {
    itemTitle: string
    id: string
    onChangeCategoryTitle: (id: string, title: string) => void;
    onRemoveCategory: (categoryId: string) => void;
}

export const EditableSpan = (
    {
        itemTitle,
        id,
        onChangeCategoryTitle,
        onRemoveCategory,
    }: EditableProps
) => {
    const [title, setTitle] = useState<string>(itemTitle);
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const onShowEdit = () => {
        setEditTitle(true);
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    };
    const changeDataTitle = () => {
        if (title.trim()) {
            onChangeCategoryTitle(id, title.trim());
            setEditTitle(false);
        } else {
            setError(true);
        }
    };
    const cancelChangeTitle = () => {
        setEditTitle(false);
        setError(false);
        setTitle(itemTitle);
    };
    const removeCategory = (id: string) => {
        onRemoveCategory(id);
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
                                error={error}
                            />
                            <div>
                                <Button onClick={changeDataTitle}>Change</Button>
                                <Button onClick={cancelChangeTitle}>Cancel</Button>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <Link to={`/todos?${ROUTING_PARAMS.CATEGORY_ID}${id}`}>{itemTitle}</Link>
                            <IconButton color="primary" onClick={onShowEdit}>
                                <CreateIcon />
                            </IconButton>
                            <IconButton
                                color="primary"
                                onClick={() => removeCategory(id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )
            }
        </>
    );
};
