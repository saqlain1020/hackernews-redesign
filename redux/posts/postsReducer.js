import {
  ADD_POSTS,
  CLEAR_LAST_VISIBLE,
  POSTS_LOADING_STOP,
  SET_POSTS,
  CLEAR_POSTS,
  POSTS_LOADING_START,
  SET_LAST_VISIBLE
} from "./postsConstants";

const init = {
  posts: [],
  lastVisible: null,
  loading: false,
};

const postsReducer = (state = init, action) => {
  let { type, payload } = action;
  switch (type) {
    case POSTS_LOADING_STOP:
      return { ...state, loading: false };
    case POSTS_LOADING_START:
      return { ...state, loading: true };
    case SET_POSTS:
      return { ...state, posts: payload };
    case ADD_POSTS:
      return { ...state, posts: [...state.posts, ...payload] };
    case CLEAR_POSTS:
      return { ...state, posts: [] };
    case SET_LAST_VISIBLE:
      return { ...state, lastVisible: payload };
    case CLEAR_LAST_VISIBLE:
      return { ...state, lastVisible: null };
    default:
      return state;
  }
};

export default postsReducer;
