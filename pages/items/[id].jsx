import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useFetched from "../../lib/useFetched";
import Comments from "../../components/Comments";
import ChatIcon from "../../components/icons/chat";
import GlobeIcon from "../../components/icons/globe";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
// import getComments from "../../lib/getComments";
import { firestore } from "./../../lib/firebase";

export default function Best() {
  const { id } = useRouter().query;
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      let querySnapshot = await firestore.collection("posts").doc(id).get();
      let post = querySnapshot.data();
      post.id = querySnapshot.id;

      let queryComments = await firestore
        .collection("comments")
        .where("postId", "==", post.id)
        .get();
      let allComments = [];
      queryComments.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        allComments.push(obj);
      });
      setPost(post);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  dayjs.extend(localizedFormat);
  React.useEffect(() => {
    getData();
  }, [id]);
  return (
    <div className="container grid justify-center my-10">
      {!loading ? (
        <div className="w-full lg:w-140">
          <Head>
            <title>Hackernews Redesign - {post.title || ""}</title>
          </Head>
          <div>
            <a
              className="font-extrabold text-xl fancy-undeline"
              href={"#"}
              target="_blank"
            >
              {post.title || ""}
            </a>
            <div className="flex mt-2">
              <p className="text-xs mr-4 text-gray-500">
                by{" "}
                <span className="text-red-500 font-medium">
                  {post.user || ""}
                </span>
              </p>
              <p className="text-xs text-gray-500 mr-4">
                {dayjs(post.createdAt?.toDate()).format("MMM D, h:mm A")}
              </p>
              <p className="text-xs text-gray-500 mr-4 flex items-start">
                <GlobeIcon /> {post.source || ""}
              </p>
              <figure className="flex items-start">
                <ChatIcon />
                <figcaption className="text-xs text-gray-500">
                  {post.comment_count || ""}
                </figcaption>
              </figure>
            </div>
              <p className="text-md text-gray-700 mr-4" style={{marginTop:20}}>
                {post.description}
              </p>
          </div>
          <Comments comments={comments} />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
