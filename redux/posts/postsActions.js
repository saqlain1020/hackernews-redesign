import { firestore } from "../../lib/firebase";
import {
  ADD_POSTS,
  CLEAR_LAST_VISIBLE,
  CLEAR_POSTS,
  SET_LAST_VISIBLE,
  SET_POSTS,
  POSTS_LOADING_START,
  POSTS_LOADING_STOP,
} from "./postsConstants";

export const startLoading = () => ({
  type: POSTS_LOADING_START,
});
export const stopLoading = () => ({
  type: POSTS_LOADING_STOP,
});
export const setLastVisible = (payload) => ({
  type: SET_LAST_VISIBLE,
  payload,
});
export const clearLastVisible = () => ({
  type: CLEAR_LAST_VISIBLE,
});
export const setPosts = (payload) => ({
  type: SET_POSTS,
  payload,
});
export const clearPosts = () => ({
  type: CLEAR_POSTS,
});
export const addPosts = (payload) => ({
  type: ADD_POSTS,
  payload,
});

const getStoriesQuery = (category, lastVisibe) => {
  let query = firestore.collection("posts");
  if (category) query = query.where("category", "==", category);
  query = query.orderBy("createdAt", "desc");
  if (lastVisibe) {
    query = query.startAfter(lastVisibe);
  }
  return query.limit(5).get();
};

export const fetchStories = (category) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    let querySnapshot = await getStoriesQuery(category, null);
    let last = querySnapshot.docs[querySnapshot.docs.length - 1];

    let posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    dispatch({
      type: SET_POSTS,
      payload: posts,
    });
    dispatch({
      type: SET_LAST_VISIBLE,
      payload: last,
    });
  } catch (error) {
    console.log(error.message);
  }
  dispatch(stopLoading());
};
export const fetchMoreStories = (category) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    let querySnapshot = await getStoriesQuery(
      category,
      getState().posts.lastVisibe
    );
    let last = querySnapshot.docs[querySnapshot.docs.length - 1];

    let posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    dispatch({
      type: ADD_POSTS,
      payload: posts,
    });
    dispatch({
      type: SET_LAST_VISIBLE,
      payload: last,
    });
  } catch (error) {
    console.log(error.message);
  }
  dispatch(stopLoading());
};

//   const stories = [
//     {
//       id: 1,
//       score: 30,
//       title: "Story Title",
//       user: "User1",
//       description: "ASdasdasdasd",
//       comment_count: 20,
//       source: "Anonymous",
//       category: "Cat",
//       createdAt: "date",
//     },
//   ];
