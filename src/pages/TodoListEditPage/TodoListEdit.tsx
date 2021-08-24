import React, {ChangeEvent} from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormGroup,
    Paper,
    TextField,
} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {useFormik} from 'formik';

import style from './TodoListEdit.module.css';

type TodoListEditProps = {
    onChangeTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    title: string,
    description: string,
    isDone: boolean,
    onChangeTodoTitle: (title: string, id: string) => void;
    onChangeTodoDescription: (description: string, id: string) => void;
    id: string,
}

export const TodoListEdit = ({
    onChangeTodoStatus,
    description,
    title,
    isDone,
    onChangeTodoTitle,
    onChangeTodoDescription,
    id,
}: TodoListEditProps) => {
    const styles = {
        Paper: {
            padding: 10,
            height: 350,
            width: 600,
            overflowY: 'auto' as 'auto',
            margin: '10px 350px',
        },
    };

    const changeTodoStatus = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        onChangeTodoStatus(e, id);
    };

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            titleForm: title,
            descriptionForm: description,
            id,
        },
        onSubmit: values => {
            onChangeTodoTitle(values.titleForm, values.id);
            onChangeTodoDescription(values.descriptionForm, values.id);
            // history.push('/todos');
        },
    });
    const isDoneStatus = {...formik.getFieldProps('isDone')};
    return (
        <Box>
            <Paper style={styles.Paper}>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <div>
                            <Button type="submit">Save</Button>
                            <Link to="/todos"><Button>Cancel</Button></Link>
                        </div>
                        <div className={style.item}>
                            <TextField
                                label="Title"
                                margin="normal"
                                variant="outlined"
                                {...formik.getFieldProps('titleForm')}
                            />
                        </div>
                        <div>
                            <Checkbox
                                color="primary"
                                checked={isDone}
                                onChange={e => changeTodoStatus(e, id)}
                            />
                            Done
                        </div>
                        <div className={style.item}>
                            <TextField
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                                {...formik.getFieldProps('descriptionForm')}
                            />
                        </div>
                    </FormGroup>
                </form>
            </Paper>
        </Box>
    );
};
