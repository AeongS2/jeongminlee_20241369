let bg;

function preload(){
  img = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
}

// 아이템 데이터
let dx, dy;
let dsize = 50;
let dActive = [];

// 점수 데이터
let gamecnt = 0;
let score = 0;

// 팩맨 데이터
let px, py;
let pd = 30;

function setItem(){
  let x = 500;
  let y = 150;

  //첫줄
  for(let i = 0; i < 10; i++){
    dx[i] = x;
    dy[i] = y;
    dActive[i] = true;

    x += 50;
  }
}


function draw() {
  background(img);
  textSize(50);
  text("점수: " + score, 10, 50);

  // 팩맨
  if(keyIsDown(LEFT_ARROW)) px -= 3;
  if(keyIsDown(RIGHT_ARROW)) px += 3;
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
