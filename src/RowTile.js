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

function RowTile({object_title,object_type, object, spotify, setShowAll, extended = false}) {
  

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

    return(
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
        <div className='searchItem__card_info'>
            
          {extended ? object?.items.map(content => (
            <Card _item={content}/>
          )) : object?.items.slice(0,4).map(content => (
            <Card _item={content}/>
          ))}
        </div>
      </div>
    );
}
export default RowTile;


