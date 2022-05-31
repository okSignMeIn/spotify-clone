import React, { useState } from "react";
import { useRecoilState } from "recoil";
import "./Body.css";
import Header from "./Header";
import { currentPlaylistState } from "./atoms/currentPlaylistAtom";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./Songrow";
import { itemState } from "./atoms/ItemState";
import { playingState } from "./atoms/PlayingState";
import { likedSongsPlaylistState } from "./atoms/LikedSongsPlaylistAtom";
import { showLikedPlaylistState } from "./atoms/showLikedState";
import { SearchState } from "./atoms/SearchAtom";
import Row from "./Row";
import RowTile from "./RowTile";

import { SearchResponse } from "./atoms/SearchResponse";

function Body({ spotify }) {
  const [showAll, setShowAll] = useState("null");
  const [_showLikedPlaylistState] = useRecoilState(showLikedPlaylistState);
  const [searchState, setSearch] = useRecoilState(SearchState);
  
  const [likedSongs] = useRecoilState(likedSongsPlaylistState);
  const [currentPlaylist] = useRecoilState(currentPlaylistState);
  const [item, setItem] = useRecoilState(itemState);
  const [playing, setPlaying] = useRecoilState(playingState);
  const [searchRes, setSearchRes] = useRecoilState(SearchResponse);
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:album:5HqyPLi4yJ6jh6JGB14BX0`,
      })
      .then((response) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          setPlaying(true);
          setItem(r.item);
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          setPlaying(true);
          setItem(r.item);
        });
      });
  };

  if (Object.keys(searchRes).length > 0) {
    return (
      <div className="body">
        <Header spotify={spotify} setShowAll={setShowAll} />
        <div className="body__songs">
          {showAll === "null" && (
            <>
              <Row
                object_title="Songs"
                object={searchRes.tracks}
                spotify={spotify}
                setShowAll={setShowAll}
              />
              <RowTile
                object_title="Albums"
                object_type="album"
                object={searchRes.albums}
                spotify={spotify}
                setShowAll={setShowAll}
              />
              <RowTile
                object_title="Artists"
                object_type="artist"
                object={searchRes.artists}
                spotify={spotify}
                setShowAll={setShowAll}
              />
            </>
          )}
          {showAll === "Songs" && 
            <Row
              object_title="Songs"
              object={searchRes.tracks}
              spotify={spotify}
              setShowAll={setShowAll}
              extended={true}
            />
          }
          {showAll === "Artists" && 
            <RowTile
                object_title="Artists"
                object_type="artist"
                object={searchRes.artists}
                spotify={spotify}
                setShowAll={setShowAll} 
                extended={true}
              />
          }
          {showAll === "Albums" && 
            <RowTile
                object_title="Albums"
                object_type="album"
                object={searchRes.albums}
                spotify={spotify}
                setShowAll={setShowAll}
                extended={true}
              />
          }
        </div>
      </div>
    );
  }
  if (_showLikedPlaylistState) {
    return (
      <div className="body">
        <Header spotify={spotify} />
        <div className="body__info">
          <FavoriteIcon fontSize="large" id="LikedSongs_logo" />
          <div className="body__infoText">
            <strong>PLAYLIST</strong>
            <h2>Liked Songs</h2>
            <p>Your collection</p>
          </div>
        </div>

        <div className="body__songs">
          {likedSongs.map((item) => (
            <SongRow track={item.track} playSong={playSong} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="body">
        <Header spotify={spotify} />
        <div className="body__info">
          <img src={currentPlaylist?.images[0].url} alt="" />
          <div className="body__infoText">
            <strong>PLAYLIST</strong>
            <h2>{currentPlaylist?.name}</h2>
            <p>{currentPlaylist?.description}</p>
          </div>
        </div>

        <div className="body__songs">
          <div className="body__icons">
            <PlayCircleFilledIcon
              className="body__shuffle"
              onClick={playPlaylist}
            />
            <FavoriteIcon fontSize="large" />
            <MoreHorizIcon />
          </div>

          {currentPlaylist?.tracks.items.map((item) => (
            <SongRow track={item.track} playSong={playSong} />
          ))}
        </div>
      </div>
    );
  }
}

export default Body;
