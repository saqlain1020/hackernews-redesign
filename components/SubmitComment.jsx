import React from "react";
import { motion } from "framer-motion";
import { auth, serverTimestamp } from "../lib/firebase";
import { firestore } from "./../lib/firebase";
import firebase from "firebase";

const item = {
  hidden: { y: 10, opacity: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const SubmitComment = ({ postId, parentId = "", getComment }) => {
  const [comment, setComment] = React.useState("");

  const handleSubmit = async () => {
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
      console.log(obj);
      getComment(obj);
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <motion.li variants={item}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="Description"
            multiline
            rows={3}
            required
          />
          <div class="md:w-2/3">
            <button
              className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default SubmitComment;
