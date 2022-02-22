import React from 'react';
import { useRecoilState } from 'recoil';
import "./SidebarOption.css"
import {showLikedPlaylistState} from "./atoms/showLikedState"
import { SearchState } from "./atoms/SearchAtom";

function SidebarOption({ title, Icon, id, setPlaylist, showLike, _searchState}) {

  const [showLiked, setLiked] = useRecoilState(showLikedPlaylistState);
  const [searchState, setSearchState] = useRecoilState(SearchState);
  

  return (
  <div className='SidebarOption' onClick={() => { 
    if(setPlaylist) 
    {
      setPlaylist(id); 
    }

      // console.log("sl", showLike);
      setLiked(showLike);
      // This happens after some time ie showLiked state changes after another click but functionality wise works perfectly fine idk why help
      // console.log(showLiked); 
    }}>
          {Icon && <Icon className="sidebarOption_logo"/>}
          {Icon ? <h4>{title}</h4> : <p>{title}</p>}
  </div>
  );
}

export default SidebarOption;
