import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducers';

interface todo {
    id: string | number,
    text: string
}

interface todoState {
    todos: Array<todo>
}
const initialState: todoState = {
    todos: [{ id: 1, text: "Hello world" }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
    }
})

// export const todoSelector = (state: RootState) => state.todos

export const { addTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer