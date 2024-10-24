const imageTrack = document.getElementById('image-track');

/**
 * Tracks the mouse position when we click on the image track and stores it in the 'data-mouse-down-at' attribute
 * @param {*} event 
 */
window.onmousedown = (event) => {
  imageTrack.dataset.mousedownAt = event.clientX;
}

window.onmousemove = (event) => {
  if(imageTrack.dataset.mousedownAt === "0") return;

  const mouseDistance = parseFloat(imageTrack.dataset.mousedownAt) - event.clientX,
  mounseMaxDistance = window.innerWidth / 2;

  // position of the track in percentage, e.g., 47%
  const percentageMoved = mouseDistance / mounseMaxDistance * -100,
  nextPercentage = parseFloat(imageTrack.dataset.prevPercentage) + percentageMoved;

  imageTrack.dataset.percentage = `${nextPercentage}`;

  imageTrack.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: 'forwards' });

  const images = imageTrack.getElementsByClassName('image');
  
  for (const image of images) {
   image.animate({
    objectPosition: `${100 + nextPercentage}% center`
   }, { duration: 1000, fill: 'forwards' });
  }
}

window.onmouseup = () => {
  imageTrack.dataset.mousedownAt = "0";
  imageTrack.dataset.prevPercentage = imageTrack.dataset.percentage;
}