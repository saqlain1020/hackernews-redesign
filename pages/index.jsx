import React from "react";
import Head from "next/head";
import Page from "../components/Page";
import { fetchStories } from "./api/posts";
import SubredditSelect from "../components/SubredditSelect";

const category = "";

const Home = () => {
  const [lastVisible, setLastVisible] = React.useState(null);
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getStories = async () => {
    setLoading(true);
    try {
      let { posts, lastVisible: last } = await fetchStories(
        category,
        lastVisible
      );

      setStories([...stories, ...posts]);
      setLastVisible(last);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  React.useState(() => {
    setStories([]);
    getStories();
  }, []);

  return (
    <>
      <Head>
        <title>Hackernews Redesign - A HN client built on top of Next.js</title>
        <meta property="og:image" content="/hn-redesign.png" />
      </Head>
      <div className="lg:col-span-2 mt-8">
        <div style={{ width: 200, marginBottom: 20 }}>
          <SubredditSelect />
        </div>
        <span className="main-title flex items-center text-soft-black">
          <h1 className="fancy-undeline">Top stories</h1>
        </span>
        <Page stories={stories} />
        {loading && <h1>Loading...</h1>}
        <button className="more-btn" onClick={getStories}>
          Load more
        </button>
      </div>
    </>
  );
};

export default Home;
