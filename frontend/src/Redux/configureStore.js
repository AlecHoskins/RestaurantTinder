import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import {URLs} from './urls'
import {Event} from './event'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
			urls: URLs,
			event: Event
        }),
        applyMiddleware(thunk)
    );

    return store;
}