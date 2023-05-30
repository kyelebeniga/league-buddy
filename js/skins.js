// const championDataURL = `http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion/${championName}.json`;
// const championImageBaseURL = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";

fetch(championDataURL)
.then(function(response){
    response.json()
    .then(function(data){
        const skinURL = Object.values(data.data[championName].skins)
        .map(data => ({
            skinName: data.name,
            skinArt: `${championImageBaseURL}${championName}_${data.num}.jpg`
        }))
        skinURL.forEach(skin => {
            
        })
    })
})