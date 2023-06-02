// URL for the champion data
const championDataURL = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion.json";

// Base URL for the champion images
const championImageBaseURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

// Get the div element to contain the images
const imageContainer = document.getElementById("image-container");

// Fetch the champion data
(async function (){
  return fetch(championDataURL)
  .then(response => {
    return response.json();
  })
  .then(championData => {
    const championNames = Object.keys(championData.data).sort();

    championNames.forEach(championName => {
      const champion = championData.data[championName];
      const championTitle = champion.title;
      const championImageURL = `${championImageBaseURL}${championName}_0.jpg`;

      fetch(championImageURL)
        .then(response => response.blob())
        .then(imageData => {
          const div = document.createElement("div");
          div.classList.add("championCard");

          const img = document.createElement("img");
          img.src = URL.createObjectURL(imageData);

          const h2 = document.createElement("h2");
          h2.textContent = championName.replace(/([A-Z])/g, ' $1').trim();

          const p = document.createElement("p");
          p.textContent = championTitle;

          div.appendChild(h2);
          div.appendChild(p);
          div.appendChild(img);
          imageContainer.appendChild(div);

          div.addEventListener('click', () => {
            console.log(`You clicked ${championName}`);
            localStorage.setItem('championId', champion.id);
            // window.location.href = '/champPage.html';
            window.location.href = '/league-buddy/champPage.html'
          });
        })
        .catch(error => console.log(error));
    });
  })
.catch(error => console.log(error));
})();


// Searches for a champion
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function() {
  const searchQuery = this.value.toLowerCase();
  const championNameElements = imageContainer.querySelectorAll("h2");

  championNameElements.forEach(championNameElement => {
    const championName = championNameElement.textContent.toLowerCase();
    championNameElement.parentNode.style.display = championName.includes(searchQuery) ? "block" : "none";
  });
});