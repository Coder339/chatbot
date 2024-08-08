import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import todoReducer from '../slices/todoSlice';
import postReducer from '../slices/postSlice';
import recipeReducer from '../slices/recipeSlice';

const rootReducer = combineReducers({
    todos: todoReducer,
    posts: postReducer,
    recipes: recipeReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer