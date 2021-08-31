export type TodoStyles = {
    overflowY?: 'auto'
    width?: number,
    height?: number,
    margin?: string,
}

export type TodoDataStyle = {
    todo: TodoStyles,
    category: TodoStyles,
}

export const commonStyle: TodoDataStyle = {
    todo: {
        overflowY: 'auto' as 'auto',
        width: 500,
        height: 350,
        margin: '10px 650px',
    },
    category: {
        overflowY: 'auto' as 'auto',
        width: 500,
        height: 350,
        margin: '10px 50px',
    },
};
