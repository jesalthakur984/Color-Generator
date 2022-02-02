// var idPost //define a global variable
// function updateVariables(){
//     idPost = document.getElementById("status").innerText; //update the global variable
// }



const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;

// Event Listeners
sliders.forEach(slider => {
  slider.addEventListener('input', hslControls);
})



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

        // Check for contrast
        checkTextcontrast(randomColor,hexText);

        // Initialize the sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color,hue,brightness,saturation);
    });
}

function checkTextcontrast(color,text){
  const luminance = chroma(color).luminance();
  if(luminance > 0.5){
    text.style.color = 'black';
  }
  else{
    text.style.color = 'white';
  }
}

function colorizeSliders(color,hue,brightness,saturation) {
    // Scale saturation
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);

    // Scale brightness
    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);

    // Update the colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,204,75), rgb(204,75,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204), rgb(204,75,204),rgb(204,75,75))`;
}

function hslControls(e) {
  const index = e.target.getAttribute('data-bright')||
  e.target.getAttribute('data-sat') ||
  e.target.getAttribute('data-hue');

    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = colorDivs[index].querySelector("h2").innerText;
    console.log(bgColor);

    let color = chroma(bgColor)
    .set('hsl.s', saturation.value)
    .set('hsl.l', brightness.value)
    .set('hsl.h', hue.value);

    colorDivs[index].style.backgroundColor = color;
}







randomColor();