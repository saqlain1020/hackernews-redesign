import React from "react";
import Link from "next/link";
import site from "../site.config";
import { auth } from "../pages/api/firebase";

function Sidebar({ uid }) {
  return (
    <div className="hidden lg:flex flex-col items-center">
      <div className="fixed h-full flex z-10">
        <div className="flex items-center px-8">
          <ul>
            {site.tabs.map((tab, i) => (
              <li key={i}>
                <Link href={tab.href}>
                  <a className="sidemenu-item">
                    {tab.icon} {tab.title}
                  </a>
                </Link>
              </li>
            ))}
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
