import React from 'react';
import './App.css';
import {AppBar, Checkbox, Grid, LinearProgress, TextField, Toolbar, Typography, Container} from '@material-ui/core';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {StatusType} from "./store/app-reducer";
import {AddItemForm} from "./utils/AddItemForm";
import {Category} from "./Category/Category";
import {CategoryStateType} from "./store/category-reducer";
import {TodosDataType} from "./store/todo-reducer";
import {Todo} from "./Category/todos/Todo";

const App = () => {

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const categories = useSelector<AppRootStateType, CategoryStateType[]>(state => state.categoryData)
    const todosData = useSelector<AppRootStateType, TodosDataType>(state => state.todoData)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Grid
                        container spacing={3}
                        justifyContent={'flex-end'}
                    >
                        <Grid item xs={2}>
                        <div>
                            <Checkbox color="secondary"/>
                            Show done
                        </div>
                       </Grid>
                        <div>
                        <Grid item xs={10}>
                            <form>
                                <TextField
                                    id='searchForm'
                                    label='search'
                                    variant='filled'
                                />
                            </form>
                        </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'} />}
            <Container fixed>
             <Grid container style={{padding: '20px'}}
                   justifyContent={'space-between'}
             >
            <AddItemForm formText={'Enter category title'} />
            <AddItemForm formText={'Text input with button'} />
            </Grid>
           </Container>
            <div>
                <div>
                {
                    categories.map(ct =>{
                       return <Category categoryTitle={ct.title} key={ct.id} />
                    })
                }
                </div>
                <div>
                {
                    categories.map(ct =>{
                    let todo = todosData[ct.id]
                    return <Todo todo={todo} key={ct.id} />
                })}
                </div>
            </div>
        </div>
    );
}

export default App;
