import { SET_POSTS, IS_FETCHING, IS_ADDING, CREATE_POST } from "./constants";

export const initialState = {
  is_fetching: false,
  posts: [],
  is_adding: false,
  post: {
    userId: "",
    title: "",
    body: ""
  }
};

function PostReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        is_fetching: action.data
      };

    case SET_POSTS:
      if (!action.data.length) {
        console.log("inside");
        action.data = initialState.get("posts");
      }

      return {
        ...state,
        posts: action.data
      };

    case IS_ADDING:
      return {
        ...state,
        is_adding: action.data
      };

    case CREATE_POST:
      return {
        ...state,
        post:action.data
      } 

    default:
      return state;
  }
}

export default PostReducer;
