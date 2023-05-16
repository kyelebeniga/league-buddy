// const championPassiveImage = "https://ddragon.leagueoflegends.com/cdn/13.9.1/img/passive/";
// const championAbilityImage = "https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/";
// const championName = 'Irelia';
// const championDataURL = `http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion/${championName}.json`;
// fetch(championDataURL)
// .then(function(response) {
//     response.json()
//     .then(function(championData){
//         const q = championData.data[championName].spells[0].id;
//         const w = championData.data[championName].spells[1].id;
//         const e = championData.data[championName].spells[2].id;
//         const r = championData.data[championName].spells[3].id;
        
//         console.log(q);
//         console.log(w);
//         console.log(e);
//         console.log(r);

//         // https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/IreliaQ.png
//         const championAbilityImageURL = `${championAbilityImage}${q}.png`
//         fetch(championAbilityImage)
//         .then(function(response){
//             response.blob()
//             .then(function(imageData){
//                 const champQ = document.querySelector('.q');
//                 champQ.src = championAbilityImageURL;
//             })
//         })
//     })
// })

fetch('http://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion/Irelia.json')
  .then(response => response.json())
  .then(data => {
    // Extract spell image URLs from the data
    const spellImageUrls = Object.values(data.data.Irelia.spells)
      .map(spell => spell.image.full)
      .map(imageName => `http://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${imageName}`);

    // Use the spell image URLs as needed
    console.log(spellImageUrls);
  })
  .catch(error => {
    console.error('Error:', error);
  });
