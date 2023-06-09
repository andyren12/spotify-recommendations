"use client";

import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Playlist from "./Playlist";
import Home from "./Home";
import Artist from "./Artist";
import { useRecoilValue } from "recoil";
import { displayState } from "@/atoms/displayAtom";
import { useState } from "react";
import AlbumPage from "./AlbumPage";
import Recommend from "./Recommend";
import Search from "./Search";

export default function Center() {
  const { data: session } = useSession();
  const display = useRecoilValue(displayState);
  const [dropDownStyle, setDropDownStyle] = useState("hidden");

  const handleDropDown = () => {
    if (dropDownStyle === "hidden") {
      setDropDownStyle("block");
    } else {
      setDropDownStyle("hidden");
    }
  };

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 cursor-pointer">
        <div
          className="flex items-center 
        bg-gray-900 space-x-3 opacity-90 hover:opacity-80 rounded-full p-1 pr-2 text-white"
          onClick={handleDropDown}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        <div
          className={`${dropDownStyle} mt-2 p-1 bg-gray-900 text-center 
          opacity-90 hover:opacity-80 transition-opacity rounded-full`}
          onClick={signOut}
        >
          Logout
        </div>
      </header>
      {display === "playlist" && <Playlist />}
      {display === "home" && <Home />}
      {display === "artist" && <Artist />}
      {display === "album" && <AlbumPage />}
      {display === "recommend" && <Recommend />}
      {display === "search" && <Search />}
    </div>
  );
}
