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

        // Generates the background splash art of the champion
        const championSplashArt = document.querySelector('.championSplashArt');
        championSplashArt.src = championImageURL;

        const championBgArt = document.getElementById('background');
        championBgArt.style.backgroundImage = "url('" + championImageURL + "')";

        // Extracts the ability info of the champion
        const spellData = Object.values(championData.data[championName].spells)
        .map(data => ({
            name: data.name,
            description: data.description,
            image: `${championAbilityImage}${data.image.full}`
        }))

        // Extracts passive info
        const passive = championData.data[championName].passive;
        const passiveData = {
            name: passive.name,
            description: passive.description,
            image: `${championPassiveImage}${passive.image.full}`
        }

        // Populates ability section
        const passiveDiv = abilityList[0];
        passiveDiv.src = passiveData.image;
        passiveDiv.dataset.spellName = passiveData.name;
        passiveDiv.dataset.spellDescription = passiveData.description;

        for(var i = 1; i < abilityList.length; i++){
            const div = abilityList[i];
            div.src = spellData[i - 1].image;
            div.dataset.spellName = spellData[i - 1].name;
            div.dataset.spellDescription = spellData[i - 1].description;
        }
    })
})

const returnDiv = document.querySelector('.return');
returnDiv.addEventListener('click', () => {
    window.location.href = `/index.html`;
    // window.location.href = `/league-buddy/index.html`;
})

// Assigns onclick event to each ability
let selectedAbility = null;
const abilityList = document.querySelector('.ability-icon').children;
for(var i = 0; i < abilityList.length; i++){
    abilityList[i].onclick = function(e) {
        const abilityName = e.target.dataset.spellName;
        const abilityDescription = e.target.dataset.spellDescription;
        const abilityDiv = e.target;

        if (selectedAbility === abilityDiv) {
            return; // Skip resizing logic
          }

        if (selectedAbility) {
            selectedAbility.style.transform = 'initial';
            selectedAbility.style.border = "none";
        }
        
        selectedAbility = abilityDiv;

        focusDiv(abilityDiv);
        displayAbilityInfo(abilityName, abilityDescription);
    }
}

function focusDiv(div){
    div.style.transition = "0.3s all ease";
    div.style.transform = "translateY(-15px)";
    div.style.border = "solid 1px rgb(99, 111, 223)";
}
function displayAbilityInfo(abilityName, abilityDescription){
    document.querySelector('.ability-name').textContent = abilityName.toUpperCase();
    document.querySelector('.ability-description').textContent = abilityDescription;
}