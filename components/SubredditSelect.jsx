import Router from 'next/router'
import React from "react";
import { useAppContext } from "../pages/api/AppContext";

const SubredditSelect = () => {
  const context = useAppContext();
  const [subreddit, setSubreddit] = React.useState("");
  const handleChange = (e) => {
    Router.push(`/subreddit/${e.target.value}`)
    setSubreddit(e.target.value)
  };
  return (
    <div>
      <div >
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            required
            name="subreddit"
            onChange={handleChange}
            value={subreddit}
          >
            <option value="" disabled>
              Select Subreddit
            </option>
            {context?.subreddits?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubredditSelect;
