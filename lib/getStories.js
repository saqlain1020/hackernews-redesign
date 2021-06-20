import { firestore } from "./firebase";

export default async function getStories(category, lastVisibe) {
  // const data = await fetch(`https://hn-apiv0.herokuapp.com/api/${category}`, {

  let query = firestore.collection("posts");
  if (category) query = query.where("category", "==", category);
  query = query.orderBy("createdAt","desc");
  if (lastVisibe) {
    query = query.startAfter(lastVisibe);
  }
  return await query.limit(5).get();
  // console.log("dt",await data.json());
  // const stories = [{
  //   id: 1,
  //   created_at: "2006-10-09T18:21:51.000Z",
  //   author: "pg",
  //   title: "Story Title",
  //   url: "http://ycombinator.com",
  //   text: null,
  //   points: 57,
  //   parent_id: null,
  //   children: [
  //     {
  //       id: 15,
  //       created_at: "2006-10-09T19:51:01.000Z",
  //       author: "sama",
  //       text: "&#34;the rising star of venture capital&#34; -unknown VC eating lunch on SHR",
  //       points: 5,
  //       parent_id: 1,
  //       children: [
  //         {
  //           id: 17,
  //           created_at: "2006-10-09T19:52:45.000Z",
  //           author: "pg",
  //           text: "Is there anywhere to eat on Sandhill Road?",
  //           points: 5,
  //           parent_id: 15,
  //           children: [],
  //         },
  //       ],
  //     },
  //   ],
  // }];

  const stories = [
    {
      id: 1,
      score: 30,
      title: "Story Title",
      user: "User1",
      description: "ASdasdasdasd",
      comment_count: 20,
      source: "Anonymous",
      category: "Cat",
      createdAt: "date",
    },
  ];
}
