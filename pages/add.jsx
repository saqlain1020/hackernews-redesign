import React from "react";
import Head from "next/head";
import { useAppContext } from "./api/AppContext";
import { submitPost } from "./api/posts";
import SubredditSelect from "../components/SubredditSelect";

export default function Add(props) {
  let context = useAppContext();
  console.log("content", context);
  const [state, setState] = React.useState({
    subreddit: "",
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let subredditName = context.subreddits.find(
        (item) => item.id === state.subreddit
      ).name;
      await submitPost({ ...state, subredditName });
      setState({
        subreddit: "",
        title: "",
        description: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  console.log(props);
  return (
    <>
      <Head>
        <title>Hackernews Redesign - Job stories</title>
      </Head>

      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit}
        onChange={handleInput}
      >
        <br />
        <br />
        <br />
        <br />
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Title
            </label>
            <input
              name="title"
              value={state.title}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="My Story"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Story Description
            </label>
            <textarea
              name="description"
              value={state.description}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Description"
              multiline
              rows={3}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Subreddit
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                required
                name="subreddit"
                value={state.subreddit}
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
        <div class="md:w-2/3">
          <button
            type="submit"
            className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
