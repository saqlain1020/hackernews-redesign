import React from "react";
import { motion } from "framer-motion";
import firebase from "firebase";
import { auth, serverTimestamp, firestore } from "../pages/api/firebase";
import { postComment } from "../pages/api/comments";

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
      let obj = {
        parentId,
        comment,
        postId,
      };
      let res = await postComment(obj);
      getComment(res);
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
