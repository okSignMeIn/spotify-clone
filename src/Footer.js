import React from 'react';
import "./Footer.css";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Grid, Slider } from "@mui/material";


function Footer() {

  
  return <div className='footer'>
      
      <div className="footer_left">
        <img className="footer_albumLogo" src="" alt="" />
        <h1> Album and song details</h1>
      </div>

      <div className="footer_center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" />
        <PauseCircleOutlineIcon className="footer__icon"/>
        <PlayCircleOutlineIcon fontSize="large" className="footer__icon"/>
        <SkipNextIcon className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>

      <div className='footer_right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
  </div>;
}

export default Footer;