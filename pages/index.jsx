import React from "react";
import Head from "next/head";
import Page from "../components/Page";
import { connect } from "react-redux";
import { fetchMoreStories } from "../redux/posts/postsActions";

const Home = ({ fetchMoreStories, loading }) => {
  const category = "";
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
        <Page category={category} />
        {loading && <h1>Loading...</h1>}
        <button className="more-btn" onClick={() => fetchMoreStories(category)}>
          Load more
        </button>
      </div>
    </>
  );
};

const actions = {
  fetchMoreStories,
};

const mapState = (store) => ({
  loading: store.posts.loading,
});

export default connect(mapState, actions)(Home);
