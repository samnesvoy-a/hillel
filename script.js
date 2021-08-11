
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

function animate() {
  
    ctx.fillStyle = "red";
  
    let counter = 0;
    let interval = setInterval(() => {
      if (counter < c.width - 10) {
        ctx.clearRect(0, 0, 200, 100);
        ctx.transform(1, 0, 0, 1, 1, 0);
        ctx.fillRect(0, 0, 10, 10);
        counter++;
      } else {
        clearInterval(interval);
        ctx.clearRect(0, 0, 200, 100);
        ctx.transform(1, 0, 0, 1, -counter, 0);
        ctx.fillRect(0, 0, 10, 10);
      }
    }, 0);
}

document.querySelector('.start').addEventListener('click', (event) => { 
    animate();
});