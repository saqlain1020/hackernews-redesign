import Head from "next/head";
import getStories from "../lib/getStories";
import Page from "../components/Page";

export async function getStaticProps() {
  const query = await getStories("jobstories", lastVisible);
  lastVisible = query.docs[query.docs.length - 1] || null;
  let posts = [];
  query.forEach((doc) => {
    let obj = doc.data();
    obj.id = doc.id;
    obj.createdAt = new Date(obj.createdAt.toDate()).toDateString();
    posts.push(obj);
  });
  console.log(posts)
  return { props: { posts } };
}

export default function Job({ posts }) {
  return (
    <>
      <Head>
        <title>Hackernews Redesign - Job stories</title>
      </Head>
      <div className="lg:col-span-2 mt-8">
        <span className="main-title flex items-center text-soft-black">
          <h1 className="fancy-undeline">Job stories</h1>
        </span>
        <Page initialData={posts} category="jobstories" />
      </div>
    </>
  );
}
