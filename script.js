/*
Learning sources
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
https://www.geeksforgeeks.org/javascript/javascript-coordinates-of-mouse/
https://www.w3schools.com/html/html5_canvas.asp#:~:text=Learn%20how%20to%20draw%20graphics%20on%20a%20web%20page
*/
/*
some testing
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
console.log("x: ",Event.clientX)
console.log("y",event.clientY)
ctx.fillRect(100, 100, 10, 10);


var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    console.log(posX,posY) */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";

//event listener for mouse down and funciton draw adds event listener for mouse move then mouse up removes event listener
function drawing() {
    console.log("works")
    let x = event.clientX;
        let y = event.clientY;
    ctx.fillRect(x, y, 10, 10);
}


function mouseDownDraw(){
    console.log("yay")
    canvas.addEventListener("mousemove",drawing)

    canvas.addEventListener("mouseup",function(){canvas.removeEventListener("mousemove",drawing)})
    canvas.addEventListener("mouseleave",function(){canvas.removeEventListener("mousemove",drawing)})
}

canvas.addEventListener("mousedown",mouseDownDraw)