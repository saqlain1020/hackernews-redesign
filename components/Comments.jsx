import React from "react";
import Comment from "./Comment";
import { motion } from "framer-motion";

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
export default function Comments({ comments }) {
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
      {/* {comments.map((comment, i) => (
        <Comment comment={comment} key={i} />
      ))} */}
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
              name="description"
              // value={state.description}
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
            type="submit"
            className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
          </div>


        </div>
      </motion.li>
    </motion.ul>
  );
}
