// eslint-disable-next-line no-use-before-define
import React, {ChangeEvent, FC, useState} from 'react';
import {Button} from '@material-ui/core';

type TodoPropsType = {
    onChangeTodoStatus: (e: React.MouseEvent<HTMLInputElement>) => void;
    todoTitle: string
    isDone: boolean;
    todoDescription: string;
    changeDescription: (description: string) => void;
    changeTitle: (title: string) => void;
}

export const TodoEdit: FC<TodoPropsType> = ({
    onChangeTodoStatus,
    todoTitle,
    isDone,
    todoDescription,
    changeDescription,
    changeTitle,
}) => {
    const [title, setTitle] = useState<string>(todoTitle);
    const [description, setDescription] = useState<string>(todoDescription);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value;
        setTitle(newTitle);
    };
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.currentTarget.value;
        setDescription(newDescription);
    };
    const onCancel = () => {
        setTitle(todoTitle);
        setDescription(todoDescription);
    };
    const changeData = () => {
        changeDescription(description);
        changeTitle(title);
    };

    return (
        <div>
            <Button onClick={changeData}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
            <input value={title} onChange={onChangeTitle} />
            <input type="checkbox" checked={isDone} onClick={onChangeTodoStatus} />
            <textarea value={description} onChange={onChangeDescription} />
        </div>
    );
};
