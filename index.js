const canvas=document.getElementById("canvas");
canvas.width=window.innerWidth-60;
canvas.height=600;
let context=canvas.getContext("2d");
let start_background_color="white";
context.fillStyle=start_background_color;
context.fillRect(0,0,canvas.width,canvas.height);
let draw_color="black";
let draw_width="2";
let is_drawing=false;
let arr=[];
let index=-1;


canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);
canvas.addEventListener("mousemove",draw,false);
canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseout",stop,false);
canvas.addEventListener("mouseup",stop,false);


function undo_last()
{
  if(index<=0)
  {
      clear_canva();
  }
  else{
      index-=1;
      arr.pop();
      context.putImageData(arr[arr.length-1],0,0);
  }
}

function clear_canva()
{
    context.fillStyle=start_background_color;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);
    arr=[];
    index=-1;
   
   
}
function change_color(element)
{
    draw_color=element.style.backgroundColor;
}
function change_color_picker(element)
{
    draw_color=element.value;
}
function change_text_width(element)
{
    draw_width=element.value;
}

function start(event)
{
    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX-canvas.offsetLeft,
        event.clientY-canvas.offsetTop);
        event.preventDefault();
       
}


function draw(event)
{
    if(is_drawing)
    {
        context.lineTo(event.clientX-canvas.offsetLeft,
                        event.clientY-canvas.offsetTop);
                        context.strokeStyle=draw_color;
                        context.lineWidth=draw_width;
                        context.lineCap="round";
                        context.lineJoin="round";
                        context.stroke();
    }
    event.preventDefault();
}
function stop(event)
{
    if(is_drawing)
    {
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    event.preventDefault();
    if(event.type!= 'mouseout')
    {
    arr.push(context.getImageData(0,0,canvas.width,canvas.height));
    index+=1;
    }
    console.log(arr);
}
