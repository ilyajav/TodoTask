
export type StatusType = 'loading' | 'succeeded'
export type InitialStateAppType = typeof initialState
type ChangeStatusType = ReturnType<typeof changeStatus>
type AppActionTypes = ChangeStatusType

const initialState = {
    status: 'loading' as StatusType
}

export const appReducer = (state: InitialStateAppType = initialState, action: AppActionTypes):InitialStateAppType =>{
    switch (action.type){
        case "APP/SET-STATUS":
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

export const changeStatus = (status: StatusType) =>{
     return{
         type: 'APP/SET-STATUS',
         payload:{
             status,
         },
     }
}
