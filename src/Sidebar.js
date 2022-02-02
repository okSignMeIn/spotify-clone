import React, { useEffect } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useRecoilState } from "recoil";
import { playlistState } from "./atoms/Playlistatom";
import SpotifyWebApi from "spotify-web-api-js";

function Sidebar({spotify}) {

  const [ playlists ] = useRecoilState(playlistState);
  const showLibrary = () => { spotify.getMySavedTracks(null, (err, res) => {
      if(err) 
      { console.log("error", err) } 
      else {
      res.items.map((item) => {
        // console.log(item.track.name);
      });
      }
      });
  }

  return <div className="sidebar">
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="spotify_logo" />
    <SidebarOption title="Home" Icon={HomeIcon}/>
    <SidebarOption title="Search" Icon={SearchOutlinedIcon}/>
    <SidebarOption title="Your Library" Icon={LibraryMusicIcon} /*onClick={showLibrary} */ />
    <strong className="sidebar_title">PLAYLISTS</strong>
    <hr />
    <br />
    {playlists?.items?.map((playlist) => (
      <SidebarOption key= {playlist.id} title={playlist.name}/>
    ))}

  </div>
    
}

export default Sidebar;