const championDataURL = "http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion.json";
const championImageBaseURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";
const championName = localStorage.getItem("championId");

// Changes title of the tab
document.title = championName;

// Fetches champion data to populate the page
fetch(championDataURL)
.then(function(response){
    response.json()
    .then(function(championData){
        const championTitle = championData.data[championName].title;
        const championImageURL = `${championImageBaseURL}${championName}_0.jpg`;
        
        // Creates name and title of champion
        document.querySelector('.name').textContent = championName.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
        document.querySelector('.title').textContent = championTitle.toUpperCase();

        fetch(championImageURL)
        .then(function(response){
            response.blob()
            .then(function(imageData){
                // Generates the background splash art of the champion
                const bgSplashArt = document.querySelector('.bgSplashArt');
                const championSplashArt = document.querySelector('.championSplashArt');
                bgSplashArt.src = championImageURL;
                championSplashArt.src = championImageURL;
            })
        })
    })
})

console.log(championName);