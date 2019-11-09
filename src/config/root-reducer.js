import { combineReducers } from "redux";
import PostReducer from "../modules/posts/reducers";
const reducers = combineReducers({
  posts:PostReducer
});

export default reducers;
