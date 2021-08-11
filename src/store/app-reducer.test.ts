import {appReducer, changeStatus, InitialStateAppType} from "./app-reducer";

let state: InitialStateAppType

beforeEach(() =>{
    state = {
        status: 'loading'
    }
})

test('status should be changed', () =>{
    const action = changeStatus('succeeded')
    const endState = appReducer(state, action)

    expect(endState.status).toBe('succeeded')
})
