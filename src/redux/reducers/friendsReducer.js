import { v4 as uuidv4 } from 'uuid';
import { FRIENDS } from "../const/index";

function FriendsReducer(state = [], action) {
  switch (action.type) {
    case FRIENDS:
        const generateID = uuidv4();
        state = [...state, { id: generateID, content: action.content}];
        return state;
    default:
        return state;
  }
}

export default FriendsReducer;