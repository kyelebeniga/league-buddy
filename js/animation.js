const parentElement = document.querySelector('.image-container');

let scale = 1;

function animate() {
  scale += 0.1;
  parentElement.style.transform = `scale(${scale})`;

  if (scale < 1.2) {
    requestAnimationFrame(animate);
  } else {
    scale = 1;
    requestAnimationFrame(animate);
  }
}

animate();