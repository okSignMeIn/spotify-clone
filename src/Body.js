import React from "react";
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
import {likedSongsPlaylistState} from "./atoms/LikedSongsPlaylistAtom";
import {showLikedPlaylistState } from "./atoms/showLikedState";
import { SearchState } from "./atoms/SearchAtom";
import Row from "./Row";
import {SearchResponse} from "./atoms/SearchResponse";

function Body({ spotify }) {
  const [_showLikedPlaylistState] = useRecoilState(showLikedPlaylistState);
  const [searchState, setSearch] = useRecoilState(SearchState);
  // console.log("Show liked playist:  ",_showLikedPlaylistState);
  const [likedSongs] = useRecoilState(likedSongsPlaylistState);
  // console.log(likedSongs);
  const [currentPlaylist] = useRecoilState(currentPlaylistState);
  const [item, setItem] = useRecoilState(itemState);
  const [playing, setPlaying] = useRecoilState(playingState);
  const [searchRes, setSearchRes] = useRecoilState(SearchResponse);

  // const Search = (query, type=["album",'artist',"playlist","track"]) =>
  // {
  //   spotify.search(query,type).then(res => {
  //     setSearchRes(res);
  //     // console.log(SearchResponse);
  //   });
  // }
  // console.log("Search term", searchTerm);
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:album:5ht7ItJgpBH7W6vJ5BqpPr`,
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
  // console.log(searchTerm);
  // if(searchTerm) {
    
  //   return (
    
      // <div className="body">
      // <Header />
      // <div className="body__songs">
      //  {/* {Search(searchTerm)} */}
      //  <Row object_title="Artist" object={searchRes} />
      //  {/* <Row title="Album" items={SearchResponse.artists} />
      //  <Row title="Artist" items={SearchResponse.artists} />
      //  <Row title="Artist" items={SearchResponse.artists} /> */}
      // </div>
      // </div>
  //   );
  // }

 if(searchState) {
   return(
     <div className="body">
       <Header spotify={spotify}/>
       <div className="body__songs">
        <Row object_title="Songs" object={searchRes.tracks} spotify={spotify}/>
        <Row object_title="Albums" object={searchRes.albums} spotify={spotify}/>
        <Row object_title="Artists" object={searchRes.artists} spotify={spotify}/>
       </div>
        
       
     </div>
    
   );
 }
 if(_showLikedPlaylistState){
    return (
    <div className="body">
      <Header spotify={spotify}/>
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
  } 
  else {
    return (
    <div className="body">
      <Header spotify={spotify}/>
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
