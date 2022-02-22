const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 600;
canvas.height = 600;

ctx.strokeStyle = "#2c2c2c"; //첫번째 색상을 검은색으로 설정
ctx.lineWidth = 2.5; //선의 너비 2.5로 설정

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {  // 클릭을 하지않고 움직였을때 
    ctx.beginPath(); //path를 만든다
    ctx.moveTo(x, y); //만든path의 종료지점으로 위치옮긴다
  } else {    // 클릭을하고 움직였을때
    ctx.lineTo(x, y);  //path점에서 부터 현재위치까지 라인을만든다
    ctx.stroke(); //라인을 보여준다
  }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
  
function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); //클릭했을때 이벤트발생
  canvas.addEventListener("mouseup", stopPainting); // 클릭을 땠을때 이벤트발생
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}
  
if (mode) {
    mode.addEventListener("click", handleModeClick);
}