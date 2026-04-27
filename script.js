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
const sizeInput=document.getElementById("sizeInput")
let isDrawing=false

ctx.fillStyle = "black";

//event listener for mouse down and funciton draw adds event listener for mouse move then mouse up removes event listener



class Tool{
    //Abstract not really tho
    constructor(brushSize,color,htmlelement){
        this.array=[]
        this.brushSize=brushSize
        this.color=color
        this.htmlelement=htmlelement

    }
    
    changeBrushSize() {
        this.brushSize=Number(sizeInput.value)
        console.log(this.brushSize)
    }

    drawing(event) {
        if (isDrawing){
        console.log("works")
        let x = event.clientX;
        let y = event.clientY;
        ctx.fillRect(x, y, this.brushSize, this.brushSize);
        }
    }

    mouseDownDraw(ev){
        console.log("yay")
        // this.drawing('test')
        isDrawing=true
        
    }

}
//to fill in gaps, draw line between them
//global boolean of is drawing insteead of removing event listeners
let ultimateTool=new Tool()

class Brush extends Tool{
    constructor(brushSize,color){
        super(brushSize,color)
    }
}

let defaultBrush=new Brush(10,"black")
defaultBrush.changeBrushSize()
let currentBrush=defaultBrush

canvas.addEventListener("mousemove",(event) => {currentBrush.drawing(event)})
canvas.addEventListener("mousedown",function(){isDrawing=true})
canvas.addEventListener("mouseup",function(){isDrawing=false})
canvas.addEventListener("mouseleave",function(){isDrawing=false})
//canvas.addEventListener("mousedown",(ev) => {currentBrush.mouseDownDraw(ev)})
sizeInput.addEventListener("change",(ev) => {currentBrush.changeBrushSize(ev)})
