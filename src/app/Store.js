import { createStore } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import Reducers from './reducers'

const persistedReducer = persistReducer(
    {
        key:'root',
        storage:AsyncStorage
    },
    Reducers
)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }