window.onload = () => {
    const div = document.getElementsByClassName('onload');
    for(let i = 0; i < div.length; i++){
        div[i].classList.add('loadAnimation');
    }
}