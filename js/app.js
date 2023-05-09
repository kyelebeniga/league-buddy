// URL for the champion data
const championDataURL = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion.json";

// Base URL for the champion images
const championImageBaseURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

// Get the div element to contain the images
const imageContainer = document.getElementById("image-container");

// Fetch the champion data
fetch(championDataURL)
.then(function(response) {
  // Extract the JSON data from the response
  response.json()
  .then(function(championData) {
    // Loop through the data object to get all champion names
    for (const championName in championData.data) {
      if (championData.data.hasOwnProperty(championName)) {
        console.log("Champion name:", championName);

        // Get the champion title
        const championTitle = championData.data[championName].title;
        console.log("Champion title:", championTitle);

        // Construct the URL for the champion image using the champion name
        const championImageURL = `${championImageBaseURL}${championName}_0.jpg`;
        console.log("Champion image URL:", championImageURL);

        // Fetch the image data
        fetch(championImageURL)
        .then(function(response) {
          // Extract the image data from the response
          response.blob()
          .then(function(imageData) {
            // Create a new div element to contain the image and title
            const div = document.createElement("div");
            div.classList.add('championCard');

            // Create an image element and set the source to the retrieved image data
            const img = document.createElement("img");
            img.src = URL.createObjectURL(imageData);

            // Create a heading element for the champion name and set the text to the champion name
            const h2 = document.createElement("h2");
            h2.textContent = championName;

            // Create a paragraph element for the champion title and set the text to the champion title
            const p = document.createElement("p");
            p.textContent = championTitle;

            // Add the heading and paragraph elements to the div
            div.appendChild(h2);
            div.appendChild(p);

            // Add the image element to the div
            div.appendChild(img);

            // Add the div to the image container
            imageContainer.appendChild(div);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }
    // Add an event listener to the search input element to filter the displayed champions
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function() {
        // Get the search query entered by the user
        const searchQuery = this.value.toLowerCase();
  
        // Get all champion name elements
        const championNameElements = imageContainer.querySelectorAll("h2");
  
        // Loop through the champion name elements and hide/show based on the search query
        championNameElements.forEach(function(championNameElement) {
          const championName = championNameElement.textContent.toLowerCase();
          if (championName.includes(searchQuery)) {
            championNameElement.parentNode.style.display = "block";
          } else {
            championNameElement.parentNode.style.display = "none";
          }
        });
      });
    });
  })
  .catch(function(error) {
    console.log(error);
  });


// fetch(championInfo)
//     .then(response => response.json())
//     .then(data => {
//         const championList = document.getElementById('display-data');
//         for(let champion in data.data) {
//             console.log(data.data[champion].name);
//             const championName = data.data[champion].name;
//             const championTitle = data.data[champion].title;
//             const championElement = document.createElement('div');
//             championElement.classList.add('championCard');
            
//             championElement.textContent = championName + ' - ' + championTitle;
//             championList.appendChild(championElement);
//         }
//     }).catch(error => console.error(error));
