import React from "react";
import Link from "next/link";
import site from "../site.config";
import { auth } from "../pages/api/firebase";
import { useAppContext } from "../pages/api/AppContext";
import BubbleIcon from "./icons/bubble";
import SparkleIcon from "./icons/sparkles";
import ZapIcon from "./icons/zap";
import FireIcon from "./icons/fire";

function Sidebar({ uid }) {
  const context = useAppContext();

  return (
    <div className="hidden lg:flex flex-col items-center">
      <div className="fixed h-full flex z-10">
        <div className="flex items-center px-8">
          <ul>
          <li>
              <Link href={`/`}>
                <a className="sidemenu-item">
                  <FireIcon /> Recent
                </a>
              </Link>
            </li>
            {context?.subreddits?.map((item, i) => (
              <li key={i}>
                <Link href={`/subreddit/${item.id}`}>
                  <a className="sidemenu-item">
                    <BubbleIcon /> {item.name}
                  </a>
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/add`}>
                <a className="sidemenu-item">
                  <ZapIcon /> Add Post
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/subreddit/create`}>
                <a className="sidemenu-item">
                  <SparkleIcon /> Add Subreddit
                </a>
              </Link>
            </li>
            {uid && (
              <Link
                href="#"
                onClick={() => {
                  auth.signOut();
                }}
              >
                <a
                  className="sidemenu-item"
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Signout
                </a>
              </Link>
            )}
            {!uid && (
              <Link href={"/signin"}>
                <a className="sidemenu-item">Sign In</a>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
