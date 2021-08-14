import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Checkbox,
    Grid,
    LinearProgress,
    TextField,
    Toolbar,
    Typography,
    Container,
    Box, Paper
} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {changeStatus, StatusType} from "./store/app-reducer";
import {AddItemForm} from "./utils/AddItemForm";
import {Category} from "./Category/Category";
import {CategoryStateType} from "./store/category-reducer";
import {TodosDataType} from "./store/todo-reducer";
import {Todos} from "./Todos/Todos";
import {Route} from "react-router-dom";


const App = () => {

    const styles = {
        Paper: {padding: 20, height: 250, overflowY: 'auto' as 'auto' }
    }

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const categories = useSelector<AppRootStateType, CategoryStateType[]>(state => state.categoryData)
    const todosData = useSelector<AppRootStateType, TodosDataType>(state => state.todoData)

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(changeStatus('succeeded'))
    }, [])

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
            </Grid>
           </Container>
            <Box display={'flex'}>
                <Box padding={'25px'}>
                    <Paper style={styles.Paper}>
                        <Route path={'/'} render={() => <Category category={categories}/>}/>
                    </Paper>
                </Box>
                        <Route path={'/category/todo-list'} render={() => {
                           return <Box margin={'-30px 450px'}>
                               <AddItemForm formText={'Enter category title'} />
                                <Paper style={styles.Paper}>
                            <Todos categories={categories} todos={todosData}  />
                                </Paper>
                            </Box>
                        }
                        }
                        />
            </Box>
        </div>
    );
}

export default App;
