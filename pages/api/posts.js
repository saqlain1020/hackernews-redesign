import { firestore } from "./firebase";

export const getStoriesQuery = (category, lastVisibe) => {
  let query = firestore.collection("posts");
  if (category) query = query.where("category", "==", category);
  query = query.orderBy("createdAt", "desc");
  if (lastVisibe) {
    query = query.startAfter(lastVisibe);
  }
  return query.limit(5).get();
};

export const fetchStories = async (category, lastVisible) => {
  try {
    let querySnapshot = await getStoriesQuery(
      category,
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
