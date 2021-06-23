import React from "react";
import Head from "next/head";

import { submitSubreddit } from "./../api/subreddit";
import { useAppContext } from "../api/AppContext";

export default function Create(props) {
  const [state, setState] = React.useState({
    name: "",
    description: "",
  });
  const context = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await submitSubreddit(state.name, state.description);
      context.fetchSubreddits();
      alert("Subreddit created");
      console.log(res);
      setState({
        name: "",
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
              Name
            </label>
            <input
              name="name"
              value={state.name}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Name"
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
              Description (optional)
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
            />
          </div>
        </div>

        <div class="md:w-2/3">
          <button
            type="submit"
            className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
