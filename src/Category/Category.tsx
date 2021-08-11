import React, {FC} from "react";
import style from './Category.module.css'
import {NavLink} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";
import {removeCategory} from "../store/category-reducer";
import {EditebleSpan} from "../utils/EditebleSpan";
import {Route} from "react-router-dom";

type CategoryType = {
    categoryTitle: string,
    id: string,
}

export const Category: FC<CategoryType> = ({categoryTitle, id}) => {

    const dispatch = useDispatch()

    const onRemoveCategory = () =>{
        dispatch(removeCategory(id))
    }

    return (
        <div>


            <div className={style.item}>
                <NavLink to={id}>{categoryTitle}</NavLink>
               <EditebleSpan />
                <span className={style.buttonElements}>
                <IconButton color={'primary'} onClick={onRemoveCategory}>
                    <DeleteIcon />
                </IconButton>
                <IconButton color={'primary'}>
                    <ControlPoint/>
                </IconButton>
                </span>
            </div>
        </div>
    )
}
