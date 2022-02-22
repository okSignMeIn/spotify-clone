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

function Row({object_title, object, spotify}) {
  

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

  if(object_title === "Songs") {
    return (
      <div className='searchItem__card'>
        <div className='hdr'>
          <h2>{object_title}</h2> 
          <Button variant="contained" className="Button">See All</Button>
        </div>
        
          <div >
            {object?.items.slice(0,4).map(track => (//dont replace these parenthesis with curly braces inside map
              <SongRow track={track} playSong={playSong} />
            ))
            }
           </div>    
      </div>
    );
  }
  
  else if(object_title === "Albums") {
    return(
      <div className='searchItem__card'>
        <div className='hdr'>
          <h2>{object_title}</h2>
          <Button className="Button" variant="contained" >See All</Button>
        </div>
        <div className='searchItem__card_info'>
          {object?.items.slice(0,4).map(album => (
            <Card _item={album}/>
          ))}
        </div>
      </div>
    );
  }

  else if(object_title === "Artists") {
    return(
      <div className='searchItem__card'>
        <div className='hdr'>
          <h2>{object_title}</h2>
          <Button variant="contained" className="Button" >See All</Button>
        </div>
        
        
        <div className='searchItem__card_info'>
          {object?.items.slice(0,4).map(artist => (
            <Card _item={artist}/>
          ))}
        </div>
      </div>
    );
  }
}
export default Row;


