import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenfromURL } from "./spotify";
import Player from "./Player";
import SpotifyWebApi from "spotify-web-api-js";
import { useRecoilState } from "recoil";
import { tokenState } from "./atoms/Tokenatom";
import { playlistState } from "./atoms/Playlistatom";
import { userState } from './atoms/Useratoms';
import { currentPlaylistState } from "./atoms/currentPlaylistAtom";
import {likedSongsPlaylistState} from "./atoms/LikedSongsPlaylistAtom";
// import SpotifyWebApi from 'spotify-web-api-js';
// USER_ID: 3175bp2y5e63ponjkijkrvpjanqq

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useRecoilState(tokenState);
  // console.log("tokenatinitialization", token);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [user, setUser] = useRecoilState(userState);
  const [currentPlaylist, setcurrentPlaylist] = useRecoilState(currentPlaylistState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsPlaylistState);


  // Run code when something changes

  useEffect(() => {

    const hash = getTokenfromURL();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }

    spotify.getUserPlaylists().then(playlists => {
      setPlaylist(playlists);
    });

    spotify.getMe().then(user => {
      setUser(user);
      // console.log(user);
    });

    spotify.getPlaylist("37i9dQZEVXcJCjfIOVi41e").then((response) => {
      setcurrentPlaylist(response);
    });

    spotify.getMySavedTracks().then(res => {
        setLikedSongs((res?.items));
    });

  }, [token, setToken, setPlaylist, setUser, setcurrentPlaylist, setLikedSongs]);

  return <div className="app"> {token ? <Player spotify={spotify} /> : <Login />}</div>;
}

export default App;
