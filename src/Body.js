import React from 'react';
import { useRecoilState } from 'recoil';
import "./Body.css";
import Header from "./Header";
import {discoverWeeklyPlaylistState} from "./atoms/DiscoverWeeklyPlaylistAtom";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from "./Songrow";
import { itemState } from './atoms/ItemState';
import { playingState } from './atoms/PlayingState';

function Body({spotify}) {

  const [discover_weekly] = useRecoilState(discoverWeeklyPlaylistState);
  const [item, setItem] = useRecoilState(itemState);
  const [playing, setPlaying] = useRecoilState(playingState);


  const playPlaylist = id => {
    spotify
    .play({
      context_uri: `spotify:album:5ht7ItJgpBH7W6vJ5BqpPr`,
    }).then(response => {
      spotify.getMyCurrentPlayingTrack().then(r => {
        setPlaying(true);
        itemState(r.item);
      });
    });
  }

  const playSong = id => {
    spotify.play({
        uris: [`spotify:track:${id}`],
      }).then(res => {
        spotify.getMyCurrentPlayingTrack().then(r => {
          setPlaying(true);
          itemState(r.item);
      });
  });
}


  return (
  <div className='body'>
    <Header />   
    <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
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

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow track={item.track} playSong={playSong}/>
        ))}
      </div>   
  </div>
  );
}

export default Body;