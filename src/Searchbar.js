import React, {useEffect, useRef, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./Searchbar.css";
import { useRecoilState } from 'recoil';
import { SearchState } from "./atoms/SearchAtom";
import { SearchResponse } from "./atoms/SearchResponse";
import CloseIcon from '@mui/icons-material/Close';



function Searchbar({spotify, setShowAll}) {
  const [searchState, setSearchState] = useRecoilState(SearchState);
  const [searchResponse, setSearchResponse] = useRecoilState(SearchResponse);

  return <div className='header__left'>
    <SearchIcon />
    <input id="searchInput" placeholder="Search for Artists, Songs, or Podcasts" type="text" onInput={(event) => {
          let eve=event.currentTarget.value.trimStart();
          

          spotify.search(eve,["album",'artist',"playlist","track"]).then(res => {
           setSearchResponse(res); 
               
          });
      }} onFocus={() => {setSearchState(true)}}/>
    <CloseIcon onClick={() => { 
      setSearchState(false);
      document.getElementById("searchInput").value="";
      setShowAll("null")
      setSearchResponse({});
    }
    }/>
  </div>
}

export default Searchbar;