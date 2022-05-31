import React, { useEffect } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "./atoms/Playlistatom";
import {currentPlaylistState} from "./atoms/currentPlaylistAtom";
import {likedSongsPlaylistState} from "./atoms/LikedSongsPlaylistAtom";
import { userState } from "./atoms/Useratoms";
import { showLikedPlaylistState } from "./atoms/showLikedState";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Sidebar({spotify, setShowAll}) {

  const [ playlists ] = useRecoilState(playlistState);
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(currentPlaylistState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsPlaylistState);
  const [user] = useRecoilState(userState);
  const [showLiked, setLiked] = useRecoilState(showLikedPlaylistState);


  const setPlaylist = id => {
    spotify.getPlaylist(String(id)).then(res => {
      setCurrentPlaylist(res);
    });
  }

  return <div className="sidebar">
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="spotify_logo" />
    <SidebarOption title="Home" Icon={HomeIcon} id="5HqyPLi4yJ6jh6JGB14BX0" setPlaylist={setPlaylist} showLike={false}/>
    {/* <SidebarOption title="Search" Icon={SearchOutlinedIcon} showLike={false} _searchState={searchState}/> */}
    <SidebarOption title="Liked Songs" Icon={FavoriteBorderIcon} showLike={true}/>
    <strong className="sidebar_title">PLAYLISTS</strong>
    <hr />
    <br />
    {playlists?.items?.map((playlist) => (
      <SidebarOption id= {playlist.id} title={playlist.name} setPlaylist={setPlaylist} showLike={false}/>
    ))}

  </div>
    
}

export default Sidebar;