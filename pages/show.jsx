import React from "react";
import Head from "next/head";
import getStories from "../lib/getStories";
import Page from "../components/Page";

// export async function getStaticProps() {
//   const query = await getStories("frontstories", lastVisible);
//   lastVisible = query.docs[query.docs.length - 1] || null;
//   let posts = [];
//   query.forEach((doc) => {
//     let obj = doc.data();
//     obj.id = doc.id;
//     obj.createdAt = new Date(obj.createdAt.toDate()).toDateString();
//     posts.push(obj);
//   });
//   console.log(posts);
//   return { props: { posts } };
// }

export default function Home() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [last, setLast] = React.useState(null);
  const getData = async () => {
    setLoading(true);
    const query = await getStories("show", last);
    let posts = [];
    setLast(query.docs[query.docs.length - 1] || last);
    query.forEach((doc) => {
      let obj = doc.data();
      obj.id = doc.id;
      obj.createdAt = new Date(obj?.createdAt?.toDate()).toDateString();
      posts.push(obj);
    });
    setStories([...stories, ...posts]);
    setLoading(false);
  };

  React.useEffect(getData, []);

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
        <Page category="frontstories" stories={stories || []} />
        {loading && <h1>Loading...</h1>}
        <button className="more-btn" onClick={getData}>
          Load more
        </button>
      </div>
    </>
  );
}
