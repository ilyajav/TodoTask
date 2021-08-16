
import React, {ChangeEvent, FC, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, IconButton, TextField} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import {changeCategoryTitle} from "../store/category-reducer";

type EditablePropsType = {
    itemTitle: string
    editTitle: boolean,
    id: string;
    setEditTitle: (value: boolean) => void;
}

export const EditableSpan: FC<EditablePropsType> = (
    {itemTitle, editTitle, id, setEditTitle}) =>{

    const [title, setTitle] = useState<string>(itemTitle)

    const dispatch = useDispatch()


   const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
   }
   const changeDataTitle = () =>{
        dispatch(changeCategoryTitle(id, title))
        setEditTitle(false)
   }
   const cancelChangeTitle = () => {
        setEditTitle(false)
        setTitle(itemTitle)
   }

    return(
        <>
            {
                editTitle
                ?
                     <>
                    <TextField
                        id={'change item title'}
                        label={'change category name'}
                        value={title}
                        onChange={onChangeTitle}
                    />
                         <div>
                         <Button onClick={changeDataTitle}>Change</Button>
                         <Button onClick={cancelChangeTitle}>Cancel</Button>
                         </div>
                     </>
                :    <IconButton color={'primary'} >
                        <CreateIcon />
                    </IconButton>
            }
        </>
    )
}
