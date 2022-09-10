import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'
import {URLs} from './urls'
import {RestaurantReducer} from './restaurants'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            token: Token,
            user: User,
			urls: URLs,
			selectedRestaurants: RestaurantReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
}