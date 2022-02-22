import React from "react";
import "./Header.css";
import { Avatar } from '@mui/material';
import { userState } from "./atoms/Useratoms";
import { useRecoilState } from "recoil";
import Searchbar from './Searchbar';


function Header({spotify}) {
  const [ user ] = useRecoilState(userState);

  return (
    <div className="header">
      <Searchbar spotify={spotify} />
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.images[0].url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;