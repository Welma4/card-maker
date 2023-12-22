import { createStore, combineReducers } from 'redux';
import textReducer from './reducers/textReducer'

const rootReducer = combineReducers(
    {
        texts: textReducer
    }
)

const store = createStore(rootReducer);


export default store