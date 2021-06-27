import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Comments from "../../components/Comments";
import ChatIcon from "../../components/icons/chat";
import GlobeIcon from "../../components/icons/globe";
import UpIcon from "../../components/icons/up";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { fetchPostData, upvotePost } from "../api/posts";
import { auth } from "../api/firebase";

export default function Best() {
  const { id } = useRouter().query;
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [upvoted, setUpvoted] = React.useState(false);

  const upvoteThisPost = async () => {
    if (await upvotePost(post.id)) setUpvoted(true);
  };

  const getData = async () => {
    setLoading(true);
    setUpvoted(false);
    try {
      let { post, comments } = await fetchPostData(id);
      console.log(post, comments);
      setComments(comments);
      setPost(post);
      if (post?.upvotesBy?.includes(auth.currentUser.uid)) {
        setUpvoted(true);
      }
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
    <>
      <div
        className="container grid justify-center my-10"
        style={{ display: "flex" }}
      >
        <div style={{ marginTop: 50, width: 60 }}>
          <UpIcon
            style={{ height: 30, cursor: "pointer" }}
            onClick={upvoteThisPost}
          />

          <p className="text-sm text-gray-500" style={{marginLeft:3,}}>{post?.upvotesBy?.length}</p>
        </div>
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
                  {dayjs(post?.createdAt?.toDate()).format("MMM D, h:mm A")}
                </p>
                <p className="text-xs text-gray-500 mr-4 flex items-start">
                  <GlobeIcon /> {post.subredditName || ""}
                </p>
                <figure className="flex items-start">
                  <ChatIcon />
                  <figcaption className="text-xs text-gray-500">
                    {post.comment_count || ""}
                  </figcaption>
                </figure>
                {!upvoted && (
                  <span
                    className="text-xs text-gray-500"
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      marginLeft: 10,
                    }}
                    onClick={upvoteThisPost}
                  >
                    Upvote
                  </span>
                )}
              </div>
              <p
                className="text-md text-gray-700 mr-4"
                style={{ marginTop: 20 }}
              >
                {post.description}
              </p>
            </div>
            <Comments postId={id} comments={comments} />
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}
