const albumImages = {
  "THE TORTURED POETS DEPARTMENT": "./img/ttpd.webp", 
  "Fearless": "./img/fear.jpg",
  "Taylor Swift": "./img/taylor.jpg",
  "Reputation": "./img/rep.jpg",
  "Lover": "./img/lover.jpg",
  "Midnights": "./img/mid.jpg",
  "Red": "./img/red.jpg",
  "Speak Now": "./img/sk.jpg",
  "1989": "./img/1989.jpg",
  "Evermore": "./img/ever.jpg",
  "Folklore": "./img/folklore.jpg",
};

const boxShadowColors = {
  "THE TORTURED POETS DEPARTMENT": "rgba(255, 0, 0, 0.5)", 
  "Fearless": "rgba(255, 252, 127, 0.10)",
  "Taylor Swift": "rgba(255, 0, 0, 0.5)",
  "Reputation": "rgba(0, 0, 255, 0.5)",
  "Lover": "rgba(255, 255, 0.5)",
  "Midnights": "rgba(0, 255, 255, 0.5)",
  "Red": "rgba(209, 140, 255, 0.21)",
  "Speak Now": "rgba(255, 255, 255, 0.5)",
  "1989": "rgba(0, 0, 0, 0.5)",
  "Evermore": "rgba(255, 0, 0, 0.5)",
  "Folklore": "rgba(209, 140, 255, 0.21)",
};

const btn = document.querySelector("button");
const heading = document.querySelector("h4");
const songContainer = document.querySelector(".song-container");

btn.addEventListener("click", getRandomQuote);

async function getRandomQuote() {
  try {
    const response = await fetch("https://taylor-swift-quotes.onrender.com/api/v1/quote");

    if (!response.ok) {
      throw new Error(`Failed to fetch: HTTP status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("API response is not an array or it's empty.");
    }

    const firstQuote = data[0]; 

    if (!firstQuote.quote) {
      throw new Error("API response is missing the 'quote' property.");
    }

    heading.innerHTML = `" ${firstQuote.quote} "`;

    if (firstQuote.song && firstQuote.album) {
      updateSongAndAlbum(firstQuote.song, firstQuote.album);
    } else {
      console.warn("API response lacks song and album information.");
      songContainer.innerHTML = "No song or album information.";
    }

  } catch (error) {
    console.error("Error fetching quote:", error.message);
    heading.innerHTML = "Error fetching quote. Please try again later.";
  }
}

function updateSongAndAlbum(song, album) {
  const imageURL = albumImages[album];
  const boxShadowColor = boxShadowColors[album];

  if (imageURL) {
    document.body.style.backgroundImage = `url('${imageURL}')`;
  }

  if (boxShadowColor) {
    const randElement = document.querySelector(".rand");
    if (randElement) {
      randElement.style.boxShadow = `0 0 30px 10px ${boxShadowColor}`;
    }

    const buttonElement = document.querySelector("button");
    if (buttonElement) {
      buttonElement.style.backgroundColor = boxShadowColor;
      buttonElement.style.borderColor = boxShadowColor;
    }
  }
  songContainer.innerHTML = `<strong>Song:</strong> ${song} - <strong>Album:</strong> ${album}`;
}
