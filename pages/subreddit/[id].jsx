import React from "react";
import Head from "next/head";
import Page from "../../components/Page";
import { fetchStories } from "./../api/posts";
import { useRouter } from "next/router";

const Home = () => {
  const [lastVisible, setLastVisible] = React.useState(null);
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {id} = useRouter().query;

  const getStories = async () => {
    setLoading(true);
    try {
      let { posts, lastVisible: last } = await fetchStories(id, lastVisible);

      setStories([...stories, ...posts]);
      setLastVisible(last);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setLastVisible(null);
    setStories([]);
    getStories();
  }, [id]);

  return (
    <>
      <Head>
        <title>Hackernews Redesign - A HN client built on top of Next.js</title>
        <meta property="og:image" content="/hn-redesign.png" />
      </Head>
      <div className="lg:col-span-2 mt-8">
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
