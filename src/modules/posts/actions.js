import { SET_POSTS, IS_FETCHING, IS_ADDING, CREATE_POST } from "./constants";
import axios from "axios";

export const setPosts = (data = []) => {
  return { type: SET_POSTS, data };
};

export const updateFetching = data => {
  return { type: IS_FETCHING, data };
};

export const updateAdding = data => {
  return { type: IS_ADDING, data };
};

export const newPost = data => {
  return { type: CREATE_POST, data };
};

export const deletePost = data => {
  return dispatch => {
    dispatch(updateAdding(true));
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/1")
      .then(function(response) {
        dispatch(updateAdding(false));
      })
      .catch(function(error) {
      });
  };
};

export const createPost = () => {
  return (dispatch,getState) => {
    const {post} = getState();
    dispatch(updateAdding(true));
    axios
      .post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          post
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      )
      .then(function(response) {
        dispatch(updateAdding(false));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const fetchPosts = () => {
  return (dispatch, getState) => {
    dispatch(updateFetching(true));

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        // handle success
        dispatch(setPosts(response.data));
        dispatch(updateFetching(false));
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
};

export const editPost = (id) => {
  return (dispatch, getState) => {
   dispatch(updateFetching(true));

    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      .then(response => {
        // handle success
        dispatch(newPost(response.data));
        dispatch(updateFetching(false));
        //console.log(response.data);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
};

export const updatePost = (id) => {
  return (dispatch,getState) => {
    //console.log(getState);return false;
    const {post} = getState();
    dispatch(updateAdding(true));
    axios
      .put(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        {
          post
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      )
      .then(function(response) {
        dispatch(updateAdding(false));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};