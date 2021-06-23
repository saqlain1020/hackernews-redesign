import React from "react";
import Story from "./Story";
import { motion } from "framer-motion";

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

const Show = ({ stories }) => {

  
  return (
    <div className="mt-4">
      <motion.div
        className="children"
        initial="hidden"
        animate="show"
        variants={list}
      >
        {stories.map((story, i) => (
          <motion.div key={i} variants={item}>
            <Story story={story}  />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};


export default Show;
