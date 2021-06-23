import { auth, firestore, serverTimestamp } from "./firebase";

export const submitSubreddit = async (name, description) => {
  try {
    if (!auth.currentUser) {
      alert("You need to login first...");
      return;
    }
    let obj = {
      name,
      description,
      createdAt: serverTimestamp,
      createdBy: auth.currentUser.uid,
      creatorName: auth.currentUser.displayName,
    };
    let query = await firestore.collection("subreddits").add(obj);
    obj.id = query.id;
    return obj;
  } catch (error) {
    console.log(error.message);
  }
};
