/*
Learning sources
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
https://www.geeksforgeeks.org/javascript/javascript-coordinates-of-mouse/
https://www.codegenes.net/blog/get-the-mouse-coordinates-when-clicking-on-canvas/
https://www.geeksforgeeks.org/html/html-canvas-lines/
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
const currentP=document.getElementById("current")
const opacityChanger=document.getElementById("opacity")
const qem3=document.getElementById("qem3")
const bgBar=document.getElementById("bgbar")
const ryanPreset=document.getElementById("ryanpreset")
const bgModeBar=document.getElementById("BGmode")
const qem4=document.getElementById("qem4")
const namingInput=document.getElementById("naming")
let isDrawing=false
let boom=new Audio("vineboom.mp3")
let yay=new Audio("yay.mp3")
let pipe=new Audio("metalpipe.mp3")
let augh=new Audio("augh.mp3")

ctx.fillStyle = "black";

let picker=document.createElement("input")
bgModeBar.appendChild(picker)
picker.size="1"
picker.value="100"
let inputValue=picker.value

//event listener for mouse down and funciton draw adds event listener for mouse move then mouse up removes event listener

//figure out how to linecap

class Tool{
    //Abstract not really tho
    constructor(brushSize,color,htmlelement,linecap){
        this.array=[]
        this.brushSize=brushSize
        this.color=color
        this.htmlelement=htmlelement
        this.linecap=linecap
    }
    
    changeBrushSize() {
        this.brushSize=Number(sizeInput.value)
        console.log(this.brushSize)
    }

    changeColor(){
        if(currentBrush==eraser){
        }else{
        this.color=colorInput.value
        currentColor=this.color;
        console.log(currentColor)
        }
    }

    drawing(event) {
        if (isDrawing){
        console.log("works")
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX-rect.left;
        let y = event.clientY-rect.top;
        ctx.strokeStyle=this.color
        ctx.lineCap=this.linecap
        //ctx.fillRect(x, y, this.brushSize, this.brushSize);
        
        ctx.lineTo(x,y)
        ctx.lineWidth=this.brushSize
        ctx.stroke()
        pipe.play()
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
    constructor(brushSize,color,htmlelement,linecap){
        super(brushSize,color,htmlelement,linecap)
        let brush=document.createElement("button")
        brush.textContent=htmlelement
        brushbar.appendChild(brush)
        brush.addEventListener("click",() => {currentBrush=this;console.log(currentBrush);currentP.textContent=this.htmlelement;if(currentBrush!=eraser){currentBrush.color=currentColor;currentBrush.brushSize=currentSize}})
        ctx.lineCap=this.linecap
    }
}

class DetachedBrush extends Tool{
    constructor(brushSize,color,htmlelement){
        super(brushSize,color,htmlelement)
        let brush=document.createElement("button")
        brush.textContent=htmlelement
        brushbar.appendChild(brush)
        brush.addEventListener("click",() => {currentBrush=this;console.log(currentBrush);currentP.textContent=this.htmlelement;currentBrush.color=currentColor;})
        //ctx.lineCap=this.linecap
    }
    drawing(event){
        if(isDrawing){
        console.log("works")
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX-rect.left;
        let y = event.clientY-rect.top;
        ctx.fillStyle=this.color
        //ctx.lineCap=this.linecap
        ctx.fillRect(x, y, this.brushSize, this.brushSize);
        }
    }
}

class masterBG{
    constructor(){
        this.mode="draw"
    }
    addMode(mode){
        let modeButton=document.createElement("button")
        bgModeBar.appendChild(modeButton)
        modeButton.textContent=mode
        modeButton.addEventListener("click",()=>{this.mode=mode;console.log(this)})
    }
}

class Background extends masterBG{
    constructor(imgSRC,mode){
        super(mode)
        this.imgSRC=imgSRC
        this.img=document.createElement("img")
        this.img.src=this.imgSRC
        this.img.width=100
        // console.log(img)
        bgBar.appendChild(this.img)
        this.img.addEventListener("click",()=>{this.chooseBG();augh.play()})
        //this.mode="draw"
    }
    
    drawBG(){
        ctx.drawImage(this.img,10,10,canvas.width,canvas.height)
    }
    repeatBG(){
        console.log("uhh")
        inputValue=picker.value
        for(let i=0;i<inputValue;i++){
            ctx.drawImage(this.img,i,i)
        }
    }
    downSmearBG(){
        inputValue=picker.value
        for(let i=0;i<inputValue;i++){
            ctx.drawImage(this.img,10,i)
        }
    }
    fourIinRange(){
        inputValue=picker.value
        for(let i=0;i<inputValue;i++){
            ctx.drawImage(this.img,i,i,i,i)
        }
    }
    chooseBG(){
        this.mode=modeNode.mode
        console.log(this.mode)
        switch(this.mode){
            
            case "draw":
                this.drawBG();
                break;
            case "repeat":
                this.repeatBG();
                break;
            case "Downward smear":
                this.downSmearBG();
                break;
            case "fourIinRange":
                this.fourIinRange();
        }
    }
}
let modeNode=new masterBG()


 //if you can center everything
modeNode.addMode("draw")
modeNode.addMode("repeat")
modeNode.addMode("Downward smear")
modeNode.addMode("fourIinRange")

let defaultBrush=new Brush(10,"black","Default","square")
let currentBrush=defaultBrush
currentColor=currentBrush.color
currentSize=currentBrush.size
let eraser=new Brush(10,"white","Eraser","square")
let roundBrush= new Brush(currentBrush.brushSize,currentColor,"Round","round")
let detachedBrush= new DetachedBrush(currentBrush.brushSize,currentColor,"Detached")

defaultBrush.changeBrushSize()

function mouseLeaveUp(){
    isDrawing=false;
    ctx.closePath()
}

let clearButton= document.createElement("button")
clearButton.textContent="Clear"
toolbar.appendChild(clearButton)
clearButton.addEventListener("click",function(){ctx.clearRect(0, 0, canvas.width, canvas.height);boom.play()})

let RyanBG=new Background("ryanpreset.png")
let VWBG=new Background("vaporwave.png")
let UnpleGrad=new Background("unpleasantgradient.png")
let KidNamedFinger= new Background("fingernat.jpg")
let cropnat= new Background("cropnat.png")



canvas.addEventListener("mousemove",(event) => {currentBrush.drawing(event)})
canvas.addEventListener("mousedown",function(event){isDrawing=true;ctx.beginPath();ctx.moveTo(event.clientX-canvas.getBoundingClientRect().left,event.clientY-canvas.getBoundingClientRect().top)})
canvas.addEventListener("mouseup",mouseLeaveUp)
canvas.addEventListener("mouseleave",mouseLeaveUp)
//canvas.addEventListener("mousedown",(ev) => {currentBrush.mouseDownDraw(ev)})
sizeInput.addEventListener("change",(ev) => {currentBrush.changeBrushSize(ev)})
colorInput.addEventListener("change",() => {currentBrush.changeColor()})
qem1.addEventListener("click",function(){window.alert('Input either HTML supported color names or Hex codes! \nFeel free to utilize the preset colors at the bottom.')})
qem2.addEventListener("click",function(){window.alert('The numbers are based on pixels, so a size 10 brush is 10 pixels wide and 10 pixels tall.')})
opacityChanger.addEventListener("change",() => {ctx.globalAlpha=parseFloat(opacityChanger.value)})
qem3.addEventListener("click",function(){window.alert("Using decimals from 0 to 1, input how much you want the end of your brush to fade. 0 is transparent, 1 is opaque.")})
//ryanPreset.addEventListener("click",()=>{RyanBG.drawBG()})
qem4.addEventListener("click",function(){window.alert("Name it the secret code and something great will happen")})
namingInput.addEventListener('change',function(){if (namingInput.value=="Gerita"){window.alert("good job, fellow fujo.");yay.play()}})
//ADD SOUNDS LIKE IN KIDPIX


