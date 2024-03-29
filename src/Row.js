import React from 'react';
import {playingState} from "./atoms/PlayingState";
import {itemState} from "./atoms/ItemState";
import SongRow from "./Songrow";
import { useRecoilState } from "recoil";
import "./Row.css"
import Card from './Card';
import Button from '@mui/material/Button';
import "./hdr.css";
import { SearchState } from "./atoms/SearchAtom";
import { Divider } from '@mui/material';

function Row({object_title, object, spotify, setShowAll, extended}) {
  

  const [item, setItem] = useRecoilState(itemState);
  const [playing, setPlaying] = useRecoilState(playingState);
  const [searchState, setSearchState] = useRecoilState(SearchState);


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


    return (
      <div className='searchItem__card'>
        <div className='hdr'>
          <h2>{object_title}</h2> 
          <Button style={{
        borderRadius: 35,
        backgroundColor: "#21b6ae"
        ,color: "#000"}}  variant="contained" onClick={()=>{
            setShowAll(object_title);
          }} >See All</Button>
        </div>
        
          <div>
            {extended ? object?.items.map(track => (//dont replace these parenthesis with curly braces inside map
              <SongRow track={track} playSong={playSong} />
            )) : object?.items.slice(0,4).map(track => (//dont replace these parenthesis with curly braces inside map
              <SongRow track={track} playSong={playSong} />
            ))
            }
           </div>    
      </div>
    );
}
export default Row;


