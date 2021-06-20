import React from "react";
import Comment from "./Comment";
import { motion } from "framer-motion";
import SubmitComment from "./SubmitComment";
import { v4 as uuid } from "uuid";

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ease: "easeOut", staggerChildren: 0.2 },
  },
};
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
const dummyComments = [
  {
    id: 1,
  },
  {
    id: 2,
    parentId: 1,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
    parentId: 3,
  },
  {
    id: 6,
    parentId: 5,
  },
  {
    id: 7,
    parentId: 6,
  },
  {
    id: 8,
    parentId: 5,
  },
];
export default function Comments({ comments: initialComments, postId }) {
  const [comments, setComments] = React.useState(initialComments);
  React.useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);
  const shapeComments = () => {
    let parentComments = dummyComments.filter((item) => !item.parentId);
    parentComments.forEach((item) => {
      shapeParent(dummyComments, item.id, item);
    });
    console.log(parentComments);
  };
  const shapeParent = (allComments, parentId, result) => {
    allComments.forEach((item) => {
      if (item.parentId === parentId) {
        if (result.children) result.children.push(item);
        else result.children = [item];
        shapeParent(
          allComments,
          result.children[result.children.length - 1].id,
          result.children[result.children.length - 1]
        );
      }
    });
  };
  shapeComments();
  return (
    <motion.ul
      className="children mt-16"
      initial="hidden"
      animate="show"
      variants={list}
    >
      {comments.map((comment, i) => (
        <Comment key={uuid()} comment={comment} key={i} />
      ))}
      <SubmitComment
        getComment={(v) => setComments([...comments, v])}
        postId={postId}
        parentId=""
      />
    </motion.ul>
  );
}
