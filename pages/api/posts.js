import { useAppContext } from "./AppContext";
import firebase, { auth, firestore, serverTimestamp } from "./firebase";

export const getStoriesQuery = (subreddit, lastVisibe) => {
  let query = firestore.collection("posts");
  if (subreddit) query = query.where("subreddit", "==", subreddit);
  query = query.orderBy("createdAt", "desc");
  if (lastVisibe) {
    query = query.startAfter(lastVisibe);
  }
  return query.limit(5).get();
};

export const fetchStories = async (subreddit, lastVisible) => {
  try {
    let querySnapshot = await getStoriesQuery(
      subreddit,
      lastVisible ? lastVisible : null
    );
    let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    let posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    return {
      posts,
      lastVisible,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchPostData = async (postId) => {
  try {
    let querySnapshot = await firestore.collection("posts").doc(postId).get();
    let post = querySnapshot.data();
    post.id = querySnapshot.id;
    let queryComments = await firestore
      .collection("comments")
      .where("postId", "==", post.id)
      .where("parentId", "==", "")
      .get();
    let allComments = [];
    queryComments.forEach((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      allComments.push(obj);
    });
    return {
      comments: allComments,
      post,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const submitPost = async (data, context) => {
  try {
    if (!auth.currentUser) {
      alert("You need to login first...");
      return;
    }
    let obj = {
      ...data,
      createdAt: serverTimestamp,
      authorId: auth.currentUser.uid,
      user: auth.currentUser.displayName,
      comment_count: 0,
      upvotesBy: [],
    };
    await firestore.collection("posts").add(obj);
    alert("Post Successful");
  } catch (error) {
    console.log(error.message);
  }
};

export const upvotePost = async (postId) => {
  try {
    await firestore
      .collection("posts")
      .doc(postId)
      .update({
        upvotesBy: firebase.firestore.FieldValue.arrayUnion(
          auth.currentUser.uid
        ),
      });
    alert("Post upvoted");
    return true;
  } catch (error) {
    console.log(error.message);
  }
};
