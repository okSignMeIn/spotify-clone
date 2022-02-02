import React from "react";
import "./Header.css";
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { userState } from "./atoms/Useratoms";
import { useRecoilState } from "recoil";

function Header() {
  const [ user ] = useRecoilState(userState);

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.images[0].url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;