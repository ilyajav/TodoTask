import React, {FC} from "react";
import style from './Category.module.css'
import {NavLink} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";
import {CategoryStateType, removeCategory} from "../store/category-reducer";
import {EditebleSpan} from "../utils/EditebleSpan";

type CategoryType = {
    category: CategoryStateType[]
}

export const Category: FC<CategoryType> = ({category}) => {

    const dispatch = useDispatch()

    return (
        <div>
            <div>
                {
                    category.map(ct =>{
                        const onRemoveCategory = () =>{
                            dispatch(removeCategory(ct.id))
                        }
                        return <div className={style.item} key={ct.id}>
                           <NavLink to={`/category/todo-list/${ct.id}`}>{ct.title}</NavLink>
                            <EditebleSpan />
                            <span className={style.buttonElements}>
                <IconButton color={'primary'} onClick={onRemoveCategory}>
                    <DeleteIcon />
                </IconButton>
                <IconButton color={'primary'}>
                    <ControlPoint/>
                </IconButton>
                </span>
                            {ct.children && ct.children.length
                                ?
                                <Category category={ct.children} />
                                : null}
                        </div>
                    })
                }
            </div>
        </div>
    )
}
