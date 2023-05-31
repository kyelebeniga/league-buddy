// @TODO: Implement a carousel on the skin sidebar

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
        skinURL.forEach((skin, index) => {
            const skinName = skin.skinName;
            const skinArt = skin.skinArt;
            const skinDefault = `${championImageBaseURL}${championName}_0.jpg`;
            const skinSideBar = document.querySelector(".swiper-wrapper");

            const skinDiv = document.createElement("div");
            skinDiv.classList.add("swiper-slide");

            const p = document.createElement("p");
            p.textContent = skinName;
            // Renames the default skin to the champion's name
            if(isFirstIteration){
                p.textContent = championName;
                isFirstIteration = false;
            }

            skinSideBar.appendChild(skinDiv);
            skinDiv.appendChild(p);

            const skinSplashDiv = document.querySelector('.skin-container');
            skinSplashDiv.style.backgroundImage = "url('" + skinDefault + "')";
            skinDiv.addEventListener('click', () => {
                skinSplashDiv.style.backgroundImage = "url('" + skinArt + "')";

                swiper.slideTo(index);
                const slides = document.querySelectorAll('.swiper-slide');
                slides.forEach((slide) => {
                    slide.style.transition = "background-color 0.3s"
                    slide.style.backgroundColor = ""; // Reset background color of all slides
                });
                skinDiv.style.backgroundColor = "red";
            })
        })
    })
})

// Code for the SwiperJS carousel
const swiper = new Swiper('.swiper', {
    speed: 800,
    observer: true,
    observeParents: true,
    autoHeight: true,
    direction: 'vertical',
    loop: false,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
});