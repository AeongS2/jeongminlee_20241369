let bg;

function preload(){
  img = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
  setItem();
  img.loadPixels();
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
let speed = 10;

// function checkWallLeft(x, y){
//   let result = true;

//   if(x > 0 &&  x < 390 && y > 90 && y <= 490){ //2
//     result = false
//     console.log("벽2");
//   }else if(x > 0 && x < 600 && y > 510 && y < 720){ //3}
//     result = false;
//     console.log("벽3");
//   }

//   return result;
// }

// function checkWallRight(x, y){
//   let result = true;

//   return result;

// }

// function checkWallUp(x, y){
//   let result = true;

//   if(x > 0 && y < 110){  //1
//     console.log("벽1");
//     result = false;
//   }else if(x > 0 && x < 560 && y > 520 && y < 760){ //3}
//     result = false;
//     console.log("벽3");

//   }

//   return result;
// }

// function checkWallDown(x, y){
//   let result = true;
//   if(x > 0 && x < 560 && y > 480 ){
//     result = false;
//     console.log("down");
//   }

//   return result;
// }

function checkWall(px, py){
  let r = pd / 2;

  let points = [
    {x: px - r, y: py}, // 왼쪽
    {x: px + r, y: py}, // 오른쪽
    {x: px, y: py - r}, // 위
    {x: px, y: py + r}  // 아래
  ];

  for(let p of points){
    let ix = floor(p.x);
    let iy = floor(p.y);
    
    let index = (ix + iy *width) * 4;
    
    let rColor = img.pixels[index];
    let gColor = img.pixels[index + 1];
    let bColor = img.pixels[index + 2];

    if(rColor > 100 || gColor > 100 || bColor > 100){
      return false;
    }

  }
  return true;
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
    if(checkWall(px - speed, py)){
      px -= speed;
    }
  }
  if(keyIsDown(RIGHT_ARROW)){
    if(checkWall(px + speed, py)){
      px += speed;
    }
  }
  if(keyIsDown(UP_ARROW)){
    if(checkWall(px, py - speed) === true){
      py -= speed;
    }
  }
  if(keyIsDown(DOWN_ARROW)){
    if(checkWall(px, py + speed) === true){ 
      py += speed;
    }
  }

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
