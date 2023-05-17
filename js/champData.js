const championName = localStorage.getItem("championId");

const championDataURL = `http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion/${championName}.json`;
const championImageBaseURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";
const championPassiveImage = "https://ddragon.leagueoflegends.com/cdn/13.9.1/img/passive/";
const championAbilityImage = "https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/";

// Changes title of the tab
document.title = championName;

// Fetches champion data to populate the page
fetch(championDataURL)
.then(function(response){
    response.json()
    .then(function(championData){
        const championTitle = championData.data[championName].title;
        const championImageURL = `${championImageBaseURL}${championName}_0.jpg`;
        const championLore = championData.data[championName].lore;
        
        // Creates name and title of champion
        document.querySelector('.name').textContent = championName.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
        document.querySelector('.title').textContent = championTitle.toUpperCase();
        document.querySelector('.blurb').textContent = championLore;

        fetch(championImageURL)
        .then(function(response){
            response.blob()
            .then(function(imageData){
                // Generates the background splash art of the champion
                const championSplashArt = document.querySelector('.championSplashArt');
                championSplashArt.src = championImageURL;

                const championBgArt = document.getElementById('background');
                championBgArt.style.backgroundImage = "url('" + championImageURL + "')";

                // Extracts the abilities of the champion
                const spellImageURL = Object.values(championData.data[championName].spells)
                .map(spell => spell.image.full)
                .map(imageName => `${championAbilityImage}${imageName}`);
            
                // Extracts passive image
                const passiveImageURL = championData.data[championName].passive.image.full;
                const passiveImage = `${championPassiveImage}${passiveImageURL}`;
                console.log(passiveImage);

                // document.querySelector('.p').src = passiveImage;
                // document.querySelector('.q').src = spellImageURL[0];
                // document.querySelector('.w').src = spellImageURL[1];
                // document.querySelector('.e').src = spellImageURL[2];
                // document.querySelector('.r').src = spellImageURL[3];
            })
        })
    })
})

const returnDiv = document.querySelector('.return');
returnDiv.addEventListener('click', () => {
    // window.location.href = `/index.html`;
    window.location.href = `/league-buddy/index.html`;
})