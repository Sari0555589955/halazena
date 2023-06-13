import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    users: [],
    admins:[]
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload
        },
        createUser: (state, action) => {
            state.users.push(action.payload)
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload)            
        },
        addAdmin: (state, action) => {
            state.admins.push(action.payload)
        },
        getAdmins: (state, action) => {
            state.admins = action.payload
        },
        deleteAdmin: (state, action) => {
            state.admins = state.admins.filter((admin) => admin._id !== action.payload)            
        },
    }
})

export const {getUsers, addAdmin, deleteUser, getAdmins, deleteAdmin} = UsersSlice.actions
export default UsersSlice.reducer