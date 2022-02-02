import React from 'react';
import { loginURL } from './spotify';

import './Login.css';

function Login() {
    return(
    <div className='login'>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt=""/>
        <a href={loginURL}> LOGIN WITH SPOTIFY </a>
    </div>
    );
}


export default Login;
