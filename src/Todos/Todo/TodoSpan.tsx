import React, {useState, FC, ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {Button, IconButton} from "@material-ui/core";
import style from "../Todos.module.css";
import CreateIcon from "@material-ui/icons/Create";
import {changeTodoDescription, changeTodoTitle} from "../../store/todo-reducer";

type TodoSpanPropsType = {
    setDescription: (value: boolean) => void,
    description: boolean,
    isDone: boolean,
    todoTitle: string
    textDescription: string,
    onChangeTodoStatus: (e: React.MouseEvent<HTMLInputElement>) => void
    categoryId: string,
    todoId: string,
}

export const TodoSpan: FC<TodoSpanPropsType> = (
    {
        setDescription,
        description ,
        isDone,
        todoTitle,
        textDescription,
        onChangeTodoStatus,
        categoryId,
        todoId
    }) =>{

    const [text, setText] = useState<string>(textDescription)
    const [title, setTitle] = useState<string>(todoTitle)

    const dispatch = useDispatch()


    const onShowDescription = () => setDescription(true)
    const onHideDescription = () => {
        setDescription(false)
        setText(textDescription)
        setTitle(todoTitle)
    }
    const changeDescription = () =>{
        dispatch(changeTodoDescription(categoryId, todoId, text))
        dispatch(changeTodoTitle(categoryId, todoId, title))
        setDescription(false)
    }
    const onChangeDescriptionText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.currentTarget.value
        setText(newText)
    }
    const onChangeTextTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newText = e.currentTarget.value
        setTitle(newText)
    }

    return(
        <>
            {description ?
                <>
                    <Button onClick={changeDescription}>Save changes</Button>
                    <Button onClick={onHideDescription}>Cancel</Button>
                    <input value={title} onChange={onChangeTextTitle} />

                    <div>
                        <input type={'checkbox'} checked={isDone}/> Done
                    </div>
                    <textarea value={text} onChange={onChangeDescriptionText}/>
                </>
                :
                <>
                    <input
                        type='checkbox'
                        checked={isDone}
                        onClick={onChangeTodoStatus}
                    />
                    <span className={style.title}>
                            {title}
                                </span>
                    <span className={style.changeTodo} onClick={onShowDescription}>
                                <IconButton color={'primary'}>
                                <CreateIcon/>
                                </IconButton>
                                </span>
                </>
            }
        </>
    )

}