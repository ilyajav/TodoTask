
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {IconButton, TextField} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

export const EditebleSpan = () =>{

    const dispatch = useDispatch()

    const [edit, setEdit] = useState<boolean>(false)

    const onEditTitleShow = () => {
        setEdit(true)
    }
    const onEditTitleHide = () => setEdit(false)


    return(
        <>
            {
                edit
                ? <TextField id={'change item title'} label={'text category name'} />
                :    <IconButton color={'primary'} >
                        <CreateIcon />
                    </IconButton>
            }
        </>
    )
}
