export type TodoStyles = {
    overflowY?: 'auto'
    width?: number,
    height?: number,
    margin?: string,
    padding?: string,
    marginTop?: number,
    minWidth?: number,
}

export type TodoDataStyle = {
    todo: TodoStyles,
    category: TodoStyles,
    addItemTodo: TodoStyles,
    addItemCategory: TodoStyles,
}

export const commonStyle: TodoDataStyle = {
    todo: {
        overflowY: 'auto' as 'auto',
        width: 500,
        height: 350,
        margin: '10px 80px',
    },
    category: {
        overflowY: 'auto' as 'auto',
        width: 500,
        height: 350,
        margin: '10px 50px',
    },
    addItemTodo: {
        padding: '20px 20px 20px 230px',
    },
    addItemCategory: {
        padding: '20px 20px 20px 150px',
    },
};