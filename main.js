const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;



// Color Generator
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}


function randomColor() {
    colorDivs.forEach((div,index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        // Add this to background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
    });
}

randomColor();