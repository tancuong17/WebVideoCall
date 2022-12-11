import {combineReducers} from 'redux'
import FriendsReducer from './friendsReducer';

export default combineReducers({
    friends: FriendsReducer
})