import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { messagesSlice } from './slices/messages';

const persistConfig = {
    key: 'counter',
    storage,
};

const reducers = combineReducers({ 
    auth: authSlice.reducer, 
    messages: messagesSlice.reducer 
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});