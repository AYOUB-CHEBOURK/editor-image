
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let download = document.getElementById("download");
let reset = document.querySelector("span");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = document.getElementById("img");
let upload = document.getElementById("upload");
let ImgBox = document.querySelector(".img-box");
let div = document.getElementById("div");

window.onload = () => {
    download.style.display ='none';
    // reset.style.display ='none';
}

upload.onchange = () => {
    resultValue()
    div.style.border ='none';
    ImgBox.style.padding ='0px'
    download.style.display ='block';
    reset.style.display ='block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = () => {
        img.src = file.result
    }
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display ='none';
    }
}

let filters = document.querySelectorAll("ul li input");

filters.forEach ((filter) => {
    filter.addEventListener('input', () =>{
        ctx.filter = `
           saturate(${saturate.value}%)
           contrast(${contrast.value}%)
           brightness(${brightness.value}%)
           sepia(${sepia.value}%)
           grayscale(${grayscale.value})
           blur(${blur.value}px)
           hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
})

function resultValue(){
    ctx.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}

reset.onclick = () => {
   resultValue()
}

download.onclick = () => {
    download.href = canvas.toDataURL('image/jpeg');
}