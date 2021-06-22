import React from "react";
import Story from "./Story";
import { motion } from "framer-motion";
import { fetchStories } from "../redux/posts/postsActions";
import { connect } from "react-redux";

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, deplay: 1 },
  },
};
const item = {
  hidden: { x: -20, opacity: 0 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Show = ({ category, posts, fetchStories }) => {

  React.useEffect(() => {
    fetchStories(category);
  }, [category]);

  return (
    <div className="mt-4">
      <motion.div
        className="children"
        initial="hidden"
        animate="show"
        variants={list}
      >
        {posts.map((story, i) => (
          <motion.div key={i} variants={item}>
            <Story story={story}  />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const actions = {
  fetchStories,
};

const mapState = (store) => ({
  posts: store.posts.posts,
});

export default connect(mapState, actions)(Show);
