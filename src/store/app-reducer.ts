export type StatusType = 'loading' | 'succeeded'
// eslint-disable-next-line no-use-before-define
export type InitialStateAppType = typeof initialState
// eslint-disable-next-line no-use-before-define
type ChangeStatusType = ReturnType<typeof changeStatus>
type AppActionTypes = ChangeStatusType

const initialState = {
    status: 'loading' as StatusType,
};

export const appReducer = (state: InitialStateAppType = initialState, action: AppActionTypes): InitialStateAppType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status};
        default:
            return state;
    }
};

export const changeStatus = (status: StatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status,
    },
});
