async function getAccessToken() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID.trim();
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET.trim();

  const credentials = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  console.log("DEBUG:", data);
  return data.access_token;
}

getAccessToken().then((token) => {
  console.log("Access Token:", token);
});
