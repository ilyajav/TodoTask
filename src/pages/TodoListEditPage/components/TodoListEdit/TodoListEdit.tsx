import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    TextField,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {useFormik} from 'formik';
import {
    toast,
    ToastContainer,
    Zoom,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ERROR_COLORS, ROUTING_PATHS} from '../../../../App.constants';
import {TodoDataStyle} from '../../../CommonComponents';

import style from './TodoListEdit.module.css';

type TodoListEditProps = {
    onChangeTodo: (title: string, id: string, description: string, isDone: boolean) => void;
    title: string,
    description: string,
    isDone: boolean,
    id: string,
    styleData: TodoDataStyle;
}

type FormikErrorType = {
    title?: string,
    description?: string,
}

export const TodoListEdit = React.memo(({
    description,
    title,
    isDone,
    id,
    onChangeTodo,
    styleData,
}: TodoListEditProps) => {
    const notifySuccess = () => toast.success('New data saved');

    const formik = useFormik({
        initialValues: {
            title,
            description,
            isDone,
            id,
            isValid: true,
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.title) {
                errors.title = 'Field is required';
                formik.isValid = false;
            }
            return errors;
        },
        onSubmit: values => {
            onChangeTodo(values.title, values.id, values.description, values.isDone);
        },
    });

    return (
        <Box>
            <Paper style={styleData.todoEdit}>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <div>
                            <ToastContainer
                                draggable={false}
                                transition={Zoom}
                                autoClose={3000}
                                position="bottom-center"
                                hideProgressBar
                            />
                            <div className={style.buttons}>
                                <Button type="submit" disabled={!formik.isValid} onClick={notifySuccess}>Save</Button>
                                <span>
                                    <Link to={`${ROUTING_PATHS.TODO_LIST_PAGE_ROUTE}`}><Button>Cancel</Button></Link>
                                </span>
                            </div>
                        </div>
                        <div className={style.item}>
                            <TextField
                                label="Title"
                                margin="normal"
                                variant="outlined"
                                color={formik.errors.title ? ERROR_COLORS.ON_ERROR : ERROR_COLORS.OFF_ERROR}
                                {...formik.getFieldProps('title')}
                            />
                            {
                                formik.errors.title &&
                                <div className={style.error}>{formik.errors.title}</div>
                            }
                        </div>
                        <div className={style.checkBox}>
                            <FormControlLabel
                                label="Done"
                                control={(
                                    <Checkbox
                                        checked={formik.values.isDone}
                                        color="primary"
                                        {...formik.getFieldProps('isDone')}
                                    />
                                )}
                            />
                        </div>
                        <div className={style.item}>
                            <TextField
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                                {...formik.getFieldProps('description')}
                            />
                        </div>
                    </FormGroup>
                </form>
            </Paper>
        </Box>
    );
});
