fetch(championDataURL)
.then(function(response){
    response.json()
    .then(function(data){
        // Gets skin data from response.json and puts it into a map
        const skinURL = Object.values(data.data[championName].skins)
        .map(data => ({
            skinName: data.name,
            skinArt: `${championImageBaseURL}${championName}_${data.num}.jpg`
        }))
        // Creates a div for each skin
        let isFirstIteration = true;
        skinURL.forEach(skin => {
            const skinName = skin.skinName;
            const skinSideBar = document.querySelector(".skin-sidebar");

            const skinDiv = document.createElement("div");
            skinDiv.classList.add("skin-element");

            const p = document.createElement("p");
            p.textContent = skinName;
            // Renames the default skin to the champion's name
            if(isFirstIteration){
                p.textContent = championName;
                isFirstIteration = false;
            }

            skinSideBar.appendChild(skinDiv);
            skinDiv.appendChild(p);

            skinDiv.addEventListener('click', () => {
                console.log(skinName);
            })
        })
    })
})