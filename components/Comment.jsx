import React from "react";
import * as timeago from "timeago.js";
import ReplyIcon from "./icons/reply";
import { motion } from "framer-motion";
import { firestore } from "./../lib/firebase";
import CommentIco from "./icons/newspaper";
import SubmitComment from "./SubmitComment";
import { v4 as uuid } from "uuid";

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

export default function Comment({ comment: initialComment }) {
  const [comment, setComment] = React.useState(initialComment);
  const [showReplies, setShowReplies] = React.useState(false);
  const [replies, setReplies] = React.useState([]);
  const [openComment, setOpenComment] = React.useState(false);

  React.useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

  const getReplies = async () => {
    try {
      let querySnapshot = await firestore
        .collection("comments")
        .where("parentId", "==", comment.id)
        .where("postId", "==", comment.postId)
        .get();
      let allComments = [];
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        allComments.push(obj);
      });
      setReplies([...replies, ...allComments]);
      setShowReplies(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const newComment = (value) => {
    if (showReplies) setReplies([value, ...replies]);
    setComment({ ...comment, hasReplies: true });
  };

  return (
    <motion.li className="my-6 font-inter" variants={item}>
      <div>
        <span className="text-gray-800 text-xs font-bold mr-4 mb-2 inline-block">
          {comment.authorName}
        </span>
        <span className="text-gray-500 text-xs">
          {timeago.format(comment?.createdAt?.toDate())}
        </span>
      </div>
      <p
        className="comments-paragraph"
        dangerouslySetInnerHTML={{ __html: comment.comment }}
      ></p>
      {comment.hasReplies && !showReplies && (
        <button
          className="flex items-center text-xs underline mt-2 text-gray-600"
          onClick={getReplies}
        >
          <ReplyIcon /> <span>replies...</span>
        </button>
      )}
      {!openComment && (
        <button
          className="flex items-center text-xs underline mt-2 text-gray-600"
          onClick={() => setOpenComment(true)}
        >
          <span>Comment</span>
        </button>
      )}
      {openComment && (
        <button
          className="flex items-center text-xs underline mt-2 text-gray-600"
          onClick={() => setOpenComment(false)}
        >
          <span>Hide Comment</span>
        </button>
      )}

      {showReplies && (
        <div className="pl-4 border-l-2 border-gray-400">
          {replies.map((reply) => (
            <Comment key={uuid()} comment={reply} />
          ))}
        </div>
      )}

      {openComment && (
        <>
          <br />
          <SubmitComment
            parentId={comment.id}
            postId={comment.postId}
            getComment={(v) => newComment(v)}
          />
        </>
      )}
    </motion.li>
  );
}
