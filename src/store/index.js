import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
    key : 'root',
    storage
}

const rootReducer = combineReducers({
    user : userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer : persistedReducer
})

export const persistor = persistStore(store)