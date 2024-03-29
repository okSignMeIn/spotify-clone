import React, { useEffect } from "react";
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


const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useRecoilState(tokenState);
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
    });

    spotify.getPlaylist("5HqyPLi4yJ6jh6JGB14BX0").then((response) => {
      setcurrentPlaylist(response);
    });

    spotify.getMySavedTracks().then(res => {
        setLikedSongs((res?.items));
    });

  }, [token, setToken, setPlaylist, setUser, setcurrentPlaylist, setLikedSongs]);

  return <div className="app"> {token ? <Player spotify={spotify} /> : <Login />}</div>;
}

export default App;
