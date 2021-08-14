
const c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let frequencyMin = 200;
let frequencyMax = 2000;
let squares = [];
let interval;
let startScore = 0;
let playingFlag = false;

let num_random = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
}

let random_color = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

let timeRandom = () => {
    return parseInt(Math.random() * (frequencyMax - frequencyMin) + frequencyMin);
}

let createSquare = (square) => {
    ctx.beginPath();
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.width, square.height);
    ctx.closePath();
}

let animate = (squares) => {
    ctx.clearRect(0, 0, c.width, c.height);
    squares.forEach((elem, index)=>{
        createSquare(elem);
        elem.y += elem.speed;
        if (elem.y + elem.height > c.height) {
            squares.splice(index, 1);
        }
    })
}

let stop = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    if (interval) {
        clearInterval(interval);
    }
    startScore = 0;
    document.querySelector('#score').innerHTML = startScore;
}

document.querySelector('.start').addEventListener('click', (event) => {
    if (!playingFlag) {
        let timeRandomize = timeRandom();
        interval = setInterval(() => {
            let width = 20;
            let height = width;
            let square = {
                width: width,
                height: height,
                x: num_random(0, c.width - width),
                y: 0,
                speed: num_random(3, 8),
                color: random_color()
            }
            squares.push(square);
            animate(squares);
        }, timeRandomize)
    }
    playingFlag = true;
});

document.querySelector('.stop').addEventListener('click', (event) => {
    stop();
    playingFlag = false;
});

c.addEventListener('click', (event) => {
    if (squares.length) {
        squares.forEach((elem, index)=>{
            if ((event.offsetX > elem.x && event.offsetY > elem.y) && (event.offsetX < elem.x + elem.width && event.offsetY < elem.y + elem.height)) {
                squares.splice(index, 1);
                startScore++;
                document.querySelector('#score').innerHTML = startScore;
            }
        })
    }
})