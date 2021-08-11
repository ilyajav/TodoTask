import React, {FC} from "react";
import style from './Category.module.css'
import {NavLink} from "react-router-dom";

type CategoryType = {
    categoryTitle: string,
}

export const Category: FC<CategoryType> = ({categoryTitle}) => {
    return (
        <div>
            <div className={style.item}>
                <NavLink to={'#'}>{categoryTitle}</NavLink>
            </div>
        </div>
    )
}
