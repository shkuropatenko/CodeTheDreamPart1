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

// Get artists

async function getArtistInfo(artistId, token) {
  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("ARTIST:", data);
  return data;
}

// Get Top tracks by artist

async function getTopTracks(artistId, token) {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log("TOP TRACKS:", data);
  return data.tracks;
}

// Call the functions and display results

getAccessToken().then(async (token) => {
  const artistId = "1Xyo4u8uXC1ZmMpatF05PJ"; // The Weeknd
  const artist = await getArtistInfo(artistId, token);
  const tracks = await getTopTracks(artistId, token);

  // Display artist info and top tracks in the HTML body
  document.body.innerHTML += `
    <h2>${artist.name}</h2>
    <p>Followers: ${artist.followers.total.toLocaleString()}</p>
    <p>Genres: ${artist.genres.join(", ")}</p>
    <img src="${artist.images[0].url}" alt="${artist.name}" width="200" />

    <h3>Top Tracks:</h3>
    <ul>
      ${tracks
        .map((track) => `<li>${track.name} (${track.popularity}★)</li>`)
        .join("")}
    </ul>
  `;
});
