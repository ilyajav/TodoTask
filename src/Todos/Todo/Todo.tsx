import React, {ChangeEvent, FC, useState} from "react";
import {changeTodoDescription, changeTodoStatus, TodosType} from "../../store/todo-reducer";
import style from "../Todos.module.css";
import {Button, IconButton} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import {useDispatch} from "react-redux";

type TodoPropsType = {
    todo: TodosType[]
    categoryId: string
    description: boolean,
    setDescription: (value: boolean) => void,
    textDescription: string[]
}

export const Todo: FC<TodoPropsType> = (
    {todo, categoryId, description, setDescription, textDescription}) => {

    const [text, setText] = useState<string>(textDescription[0])

    const onShowDescription = () => {
        setDescription(true)
    }
    const onHideDescription = () => {
        setDescription(false)
        setText(textDescription[0])
    }

    const dispatch = useDispatch()

    return (
        <div>
            {
                todo.map(td => {
                    const onChangeTodoStatus = (e: React.MouseEvent<HTMLInputElement>) => {
                        const isDone = e.currentTarget.checked
                        dispatch(changeTodoStatus(categoryId, td.id, isDone))
                    }
                    const onChangeDescriptionText = (e: ChangeEvent<HTMLTextAreaElement>) => {
                        setText(e.currentTarget.value)
                    }
                    const changeDescription = () => {
                        dispatch(changeTodoDescription(categoryId, td.id, text))
                        setDescription(false)
                    }
                    return (
                        <div key={td.id} className={style.item}>
                            {description ?
                                <>
                                    <Button onClick={changeDescription}>Save changes</Button>
                                    <Button onClick={onHideDescription}>Cancel</Button>
                                    <input value={td.title}/>

                                    <div>
                                        <input type={'checkbox'} checked={td.isDone}/> Done
                                    </div>
                                    <textarea value={text} onChange={onChangeDescriptionText}/>
                                </>
                                :
                                <>
                                    <input
                                        type='checkbox'
                                        checked={td.isDone}
                                        onClick={onChangeTodoStatus}
                                    />
                                    <span className={style.title}>
                            {td.title}
                                </span>
                                    <span className={style.changeTodo} onClick={onShowDescription}>
                                <IconButton color={'primary'}>
                                <CreateIcon/>
                                </IconButton>
                                </span>
                                </>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}