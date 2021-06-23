import { auth, firestore } from "./firebase";

export const fetchReplies = async (postId, parentId) => {
  try {
    let querySnapshot = await firestore
      .collection("comments")
      .where("parentId", "==", parentId)
      .where("postId", "==", postId)
      .get();
    let allComments = [];
    querySnapshot.forEach((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      allComments.push(obj);
    });
    return allComments;
    setReplies([...replies, ...allComments]);
    setShowReplies(true);
  } catch (error) {
    console.log(error.message);
  }
};

export const postComment = async ({ parentId, postId, comment }) => {
  try {
    if (!auth.currentUser) {
      alert("Must be signed in");
      return;
    }
    if (!comment) return;
    let { uid, displayName } = auth.currentUser;
    let obj = {
      parentId,
      postId,
      hasReplies: false,
      comment,
      authorId: uid,
      authorName: displayName,
      createdAt: serverTimestamp,
    };
    let query = await firestore.collection("comments").add(obj);
    if (parentId)
      await firestore
        .collection("comments")
        .doc(parentId)
        .update({ hasReplies: true });
    await firestore
      .collection("posts")
      .doc(postId)
      .update({ comment_count: firebase.firestore.FieldValue.increment(1) });
    obj.id = query.id;
    obj.createdAt = { toDate: () => new Date() };
    return obj;
  } catch (error) {
    console.log(error.message);
  }
};
