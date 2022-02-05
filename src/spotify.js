export const authEndpoint="https://accounts.spotify.com/authorize";
const redirectUri="http://localhost:3000/";
const clientId= "4c14f5f88a59494daa08e73bce8f1b4f";
const scopes=[
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-private",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "user-library-read",
    "playlist-modify-public",
    "playlist-modify-private"
];

export const getTokenfromURL= () => {
    return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {}); 
};
export const loginURL=`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
