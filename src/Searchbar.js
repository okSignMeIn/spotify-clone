import React, {useEffect, useRef} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./Searchbar.css";
import { useRecoilState } from 'recoil';
import { SearchState } from "./atoms/SearchAtom";
import { SearchResponse } from "./atoms/SearchResponse";
import CloseIcon from '@mui/icons-material/Close';



function Searchbar({spotify}) {

  const [searchState, setSearchState] = useRecoilState(SearchState);
  const [searchResponse, setSearchResponse] = useRecoilState(SearchResponse);

  return <div className='header__left'>
    <SearchIcon />
    <input id="searchInput" placeholder="Search for Artists, Songs, or Podcasts" type="text" onInput={(event) => {
           spotify.search(event.currentTarget.value,["album",'artist',"playlist","track"]).then(res => {
           setSearchResponse(res); 
           console.log(res);     
          });
      }} onFocus={() => {setSearchState(true)}}/>
    <CloseIcon onClick={() => { 
      setSearchState(false);
      document.getElementById("searchInput").value="";
      setSearchResponse({});
    }
    }/>
  </div>
}

export default Searchbar;