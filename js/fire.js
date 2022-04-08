let main = document.getElementById('text-main')
let content = document.getElementById('text'),

maxWidth  = content.clientWidth,
maxHeight = content.clientHeight;
window.addEventListener("resize", resize);
resize();
function resize(){let scale,
width = window.innerWidth,
height = window.innerHeight,
isMax = width >= maxWidth && height >= maxHeight;

scale = Math.min(width/maxWidth, height/maxHeight);
content.style.transform = isMax?'':'scale(' + scale + ')';
main.style.width = isMax?'':maxWidth * scale;
main.style.height = isMax?'':maxHeight * scale;
}

setTimeout(function() {
     
    window.location.href = "index.html";
},2000);