const btn = document.querySelector("button");
const heading = document.querySelector("h4"); // this will have the quote itself
const songContainer = document.querySelector(".song-container"); // Assuming a container for song/album info

btn.addEventListener("click", getRandomJoke);

async function getRandomJoke() {
  try {
    const response = await fetch(
      "https://taylor-swift-lyrics-eaia.onrender.com/get"
    );
    const data = await response.json();

    if (!data.quote) {
      console.error("API response doesn't contain expected 'quote' property.");
      return;
    }

    heading.innerHTML = data.quote;

    if (data.song && data.album) {
      const songName = data.song;
      const albumName = data.album;

      const songElement = document.createElement("p");
      songElement.id = `song-${Math.random().toString(36).substr(2, 9)}`;
      songElement.innerHTML = `<strong>Song:</strong> ${songName} - <strong>Album:</strong> ${albumName}`; // Combined and emphasized

      // songContainer.appendChild(songElement); appending everytime will duplicate it instead change the value itself
      songContainer.innerHTML = songElement.innerHTML;
    } else {
      console.warn("API response didn't include song and album information.");
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}