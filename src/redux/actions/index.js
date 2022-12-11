import { FRIENDS } from "../const/index";
export const actionFriends = (content) => {
  return {
    type: FRIENDS,
    content,
  };
};