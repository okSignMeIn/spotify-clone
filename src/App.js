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
import { discoverWeeklyPlaylistState } from "./atoms/DiscoverWeeklyPlaylistAtom";
// import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useRecoilState(tokenState);
  console.log("tokenatinitialization", token);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [user, setUser] = useRecoilState(userState);
  const [discoverWeekly, setDiscoverWeekly] = useRecoilState(discoverWeeklyPlaylistState);

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

    spotify.getPlaylist("37i9dQZEVXcJCjfIOVi41e").then((response) => {
      setDiscoverWeekly(response);
    });

  }, [token, setToken, setPlaylist, setUser, setDiscoverWeekly]);

  return <div className="app"> {token ? <Player /> : <Login />}</div>;
}

export default App;
