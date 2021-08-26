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

import {ERROR_COLORS} from '../../App.constants';

import style from './TodoListEdit.module.css';

type TodoListEditProps = {
    onChangeTodoStatus: (isDone: boolean, id: string) => void;
    title: string,
    description: string,
    isDone: boolean,
    onChangeTodoTitle: (title: string, id: string) => void;
    onChangeTodoDescription: (description: string, id: string) => void;
    id: string,
}

type FormikErrorType = {
    title?: string,
    description?: string,
}

export const TodoListEdit = React.memo(({
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
            if (values.title !== title) {
                onChangeTodoTitle(values.title, values.id);
            }
            if (values.description !== description) {
                onChangeTodoDescription(values.description, values.id);
            }
            if (values.isDone !== isDone) {
                onChangeTodoStatus(values.isDone, values.id);
            }
        },
    });

    return (
        <Box>
            <Paper style={styles.Paper}>
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
                            <Button type="submit" disabled={!formik.isValid} onClick={notifySuccess}>Save</Button>
                            <Link to="/todos"><Button>Cancel</Button></Link>
                        </div>
                        <div className={style.item}>
                            <TextField
                                label="Title"
                                margin="normal"
                                variant="outlined"
                                className={style.errorBlock}
                                color={formik.errors.title ? ERROR_COLORS.ON_ERROR : ERROR_COLORS.OFF_ERROR}
                                {...formik.getFieldProps('title')}
                            />
                            {
                                formik.errors.title &&
                                <div className={style.error}>{formik.errors.title}</div>
                            }
                        </div>
                        <div>
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
