import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Create the persist config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Needed for Redux Persist
        }),
});

// Create the persisted store
export const persistor = persistStore(store);

// export const store = configureStore({
//     reducer: rootReducer,
//     // middleware: [thunk],
// })

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector