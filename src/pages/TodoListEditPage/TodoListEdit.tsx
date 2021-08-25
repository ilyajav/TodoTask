import React from 'react';
import {
    Box,
    Button,
    Checkbox, FormControlLabel,
    FormGroup,
    Paper,
    TextField,
} from '@material-ui/core';
import {
    Link,
    useHistory,
} from 'react-router-dom';
import {useFormik} from 'formik';

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

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            title,
            description,
            isDone,
            id,
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.title) {
                errors.title = 'Field is required';
            }
            return errors;
        },
        onSubmit: values => {
            onChangeTodoTitle(values.title, values.id);
            onChangeTodoDescription(values.description, values.id);
            onChangeTodoStatus(values.isDone, values.id);
            // history.push('/todos');
        },
    });
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
                                {...formik.getFieldProps('title')}
                            />
                            {
                                formik.errors.title && <div className={style.error}>{formik.errors.title}</div>
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
};
