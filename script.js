const btn = document.querySelector("button");
const heading = document.querySelector("h4");
const songContainer = document.querySelector(".song-container");

const albumImages = {
  "Taylor Swift": "./img/taylor.jpg",
  "Fearless": "./img/fear.jpg",
  "Reputation": "./img/rep.jpg",
  "Lover": "./img/lover.jpg",
  "Midnights": "./img/mid.jpg",
  "Red": "./img/red.jpg",
  "Speak Now": "./img/sk.jpg",
  "1989": "./img/1989.jpg",
  "Evermore": "./img/ever.jpg",
  "Folklore": "./img/Folklore.jpg",
};

const boxShadowColors = {
  "Taylor Swift": "rgba(255, 0, 0, 0.5)", 
  "Fearless": " rgba(255, 252, 127, 0.21)  ",
  "Reputation": "rgba(0, 0, 255, 0.5)",
  "Lover": "rgba(255, 255, 0, 0.5)",
  "Midnights": "rgba(0, 255, 255, 0.5)",
  "Red": "rgba(209, 140, 255, 0.21)",
  "Speak Now": "rgba(255, 255, 255, 0.5)",
  "1989": "rgba(0, 0, 0, 0.5)",
  "Evermore": "rgba(255, 0, 0, 0.5)",
  "Folklore": " rgba(209, 140, 255, 0.21) ",
};

btn.addEventListener("click", getRandomquote);

async function getRandomquote() {
  try {
    const response = await fetch("https://taylor-swift-lyrics-eaia.onrender.com/get");
    const data = await response.json();

    if (!data.quote) {
      console.error("API response doesn't contain expected 'quote' property.");
      return;
    }

    heading.innerHTML = data.quote;

    if (data.song && data.album) {
      const songName = data.song;
      const albumName = data.album;

      const imageURL = albumImages[albumName];
      const boxShadowColor = boxShadowColors[albumName] 

      document.body.style.backgroundImage = `url('${imageURL}')`;
      
      // Update the box shadow color for the .rand element
      const randElement = document.querySelector(".rand");
      if (randElement) {
        randElement.style.boxShadow = `0 0 30px 10px ${boxShadowColor}`;
      }
      const buttonElement = document.querySelector("button");
      if (buttonElement) {
        buttonElement.style.backgroundColor = boxShadowColor;
        buttonElement.style.borderColor = boxShadowColor;
      }
      document.body.style.backgroundImage = `url('${imageURL}')`;

      const songElement = document.createElement("p");
      songElement.id = `song-${Math.random().toString(36).substr(2, 9)}`;
      songElement.innerHTML = `<strong>Song:</strong> ${songName} - <strong>Album:</strong> ${albumName}`;

      songContainer.innerHTML = songElement.innerHTML;
    } else {
      console.warn("API response didn't include song and album information.");
    }
  } catch (error) {
    console.error("Error fetching :", error);
  }
}
