/*
Learning sources
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
https://www.geeksforgeeks.org/javascript/javascript-coordinates-of-mouse/
https://www.codegenes.net/blog/get-the-mouse-coordinates-when-clicking-on-canvas/
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
const toolbar=document.getElementById("toolbar")
const brushbar=document.getElementById("brushbar")
const colorInput=document.getElementById("colorinput")
const qem1=document.getElementById("qem1")
const qem2=document.getElementById("qem2")
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

    changeColor(){
        this.color=colorInput.value
    }

    drawing(event) {
        if (isDrawing){
        console.log("works")
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX-rect.left;
        let y = event.clientY-rect.top;
        ctx.fillStyle=this.color
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
    constructor(brushSize,color,htmlelement){
        super(brushSize,color,htmlelement)
        let brush=document.createElement("button")
        brush.textContent=htmlelement
        brushbar.appendChild(brush)
        brush.addEventListener("click",() => {currentBrush=this;console.log(currentBrush)})
    }
}

let defaultBrush=new Brush(10,"black","Default")
defaultBrush.changeBrushSize()
let currentBrush=defaultBrush

canvas.addEventListener("mousemove",(event) => {currentBrush.drawing(event)})
canvas.addEventListener("mousedown",function(){isDrawing=true})
canvas.addEventListener("mouseup",function(){isDrawing=false})
canvas.addEventListener("mouseleave",function(){isDrawing=false})
//canvas.addEventListener("mousedown",(ev) => {currentBrush.mouseDownDraw(ev)})
sizeInput.addEventListener("change",(ev) => {currentBrush.changeBrushSize(ev)})
colorInput.addEventListener("change",() => {currentBrush.changeColor()})
qem1.addEventListener("click",function(){window.alert('Input either HTML supported color names or Hex codes! \nFeel free to utilize the preset colors at the bottom.')})
qem2.addEventListener("click",function(){window.alert('The numbers are based on pixels, so a size 10 brush is 10 pixels wide and 10 pixels tall.')})