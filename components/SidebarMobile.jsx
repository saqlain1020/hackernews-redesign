import React from "react";
import Link from "next/link";
import site from "../site.config";
import useOnClickOutside from "use-onclickoutside";
import ZapIcon from "./icons/zap";
import FireIcon from "./icons/fire";
import SparkleIcon from "./icons/sparkles";

function Sidebar({ closeMenu, uid }) {
  const ref = React.useRef(null);
  useOnClickOutside(ref, closeMenu);

  return (
    <div className="lg:hidden flex flex-col items-center0">
      <div
        className="fixed top-0 left-0 shadow-xl h-full flex bg-white z-10"
        ref={ref}
      >
        <div className="flex items-center px-8">
          <ul>
            <li>
              <Link href={`/`}>
                <a className="sidemenu-item">
                  <FireIcon /> Recent
                </a>
              </Link>
            </li>{" "}
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
                href={"#"}
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
