let bg;

function preload(){
  img = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
  setItem();
  
}

// 아이템 데이터
let dx = [];
let dy = [];
let dsize = 15;
let dActive = [];

// 점수 데이터
let gamecnt = 0;
let score = 0;

// 팩맨 데이터
let px = 400;
let py = 300;
let pd = 50;

function checkWallLeft(x, y){
  let result = false;
  if(x > 390 && y > 80 ){
    result = true;
  }

  return result;
}

function checkWallRight(x, y){
  let result = false;
  if(x < 2420 && y > 80 ){
    result = true;
  }

  return result;
}

//수정필요
function setItem(){
  let x = 420;
  let y = 130;
  let dis = 90;
  let line = 1;

  for(let i = 0; i < 22; i++){
    //첫줄
    if(line === 1){
      dx[i] = x;
      dy[i] = y;
      dActive[i] = true;
  
      x += dis;

      if(i === 10){
        x += dis;
      }
      if(i === 21){
        line = 2;
        y += dis;
      }
    }
  }


  for(let i = 0; i < 4; i++){

  }
}



function draw() {
  
  background(img);
  fill(255, 255, 0);
  textSize(50);
  text("점수: " + score, 10, 50);

  // 벽
  //drawMap();  //수정

  // 팩맨
  if(keyIsDown(LEFT_ARROW)){
    if(checkWallLeft(px, py) === true){
      px -= 10;

    }
  }
  if(keyIsDown(RIGHT_ARROW)){
    if(checkWallRight(px, py) === true){
      px += 10;
    }
  }
  if(keyIsDown(UP_ARROW)) py -= 3;
  if(keyIsDown(DOWN_ARROW)) py += 3;

  fill(255, 255, 0);
  ellipse(px, py, pd);

  // 충돌 감지
  for(let i = 0; i < dActive.length; i++){
    
    if(dActive[i] === true){
      fill(255, 240, 31);
      ellipse(dx[i], dy[i], dsize);

    }
  }

}


function mousePressed(){
  console.log(mouseX, mouseY);
}