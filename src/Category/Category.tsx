import React, {FC, useState} from "react";
import style from './Category.module.css'
import {NavLink} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";
import {CategoryStateType, removeCategory} from "../store/category-reducer";
import {EditableSpan} from "../utils/EditebleSpan";
import CreateIcon from "@material-ui/icons/Create";

type CategoryType = {
    category: CategoryStateType[]
    description: boolean
}

export const Category: FC<CategoryType> = ({category, description}) => {
    const dispatch = useDispatch()

    const [editTitle, setEditTitle] = useState<boolean>(false)

    const onClickEditTitle = () => {
        setEditTitle(true)
    }

    return (
        <div>
            <div>
                {
                    category.map(ct => {
                        const onRemoveCategory = () => {
                            dispatch(removeCategory(ct.id))
                        }
                        return <div className={style.item} key={ct.id}>
                            {editTitle ? <EditableSpan
                                    itemTitle={ct.title}
                                    editTitle={editTitle}
                                    id={ct.id}
                                    setEditTitle={setEditTitle}
                                />
                                :
                                <>
                                    <NavLink to={`/category/todo-list/${ct.id}`}>{ct.title}</NavLink>
                                    <IconButton color={'primary'} onClick={onClickEditTitle}>
                                        <CreateIcon/>
                                    </IconButton>
                                    <span className={style.buttonElements}>
                <IconButton color={'primary'} onClick={onRemoveCategory}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton color={'primary'}>
                    <ControlPoint/>
                </IconButton>
                </span>
                                </>
                            }
                            {ct.children && ct.children.length
                                ?
                                <Category category={ct.children} description={description}/>
                                : null}
                        </div>
                    })
                }
            </div>
        </div>
    )
}
