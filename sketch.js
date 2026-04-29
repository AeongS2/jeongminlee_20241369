let bg;

function preload(){
  img = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
  img.loadPixels();
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
let speed = 10;


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
    
    let index = (ix + iy * img.width) * 4;
    
    let rColor = img.pixels[index];
    let gColor = img.pixels[index + 1];
    let bColor = img.pixels[index + 2];

    if(rColor > 100 || gColor > 100 || bColor > 100){
      return false;
    }

  }
  return true;
}

function checkPath(x, y){
  let dr = dsize/2 + 5;

  let dpoints = [
    {x: x-dr, y: y},
    {x: x+dr, y: y},
    {x: x, y: y-dr},
    {X: x, y: y+dr}
  ];

  for(let p of dpoints){
    let ix = floor(p.x);
    let iy = floor(p.y);

    let index = (ix + iy * img.width) * 4;

    let rColor = img.pixels[index];
    let gColor = img.pixels[index+1];
    let bColor = img.pixels[index+2];

    if(rColor > 100 || gColor > 100 || bColor > 100){
      return false;
    }
  }

  return true;

}

//수정필요
function setItem(){
  let x;
  let y = 130;
  let dis = 90;
  
  for(let li = 0; li < 17; li++){ //세로 17개
    //가로 23개
    x = 435;
    dActive[li] = [];
    dx[li] = [];
    dy[li] = [];
    for(let i = 0; i < 23; i++){
      if(checkPath(x, y)){
        dx[li][i] = x;
        dy[li][i] = y;
        dActive[li][i] = true;
      }else{
        dActive[li][i] = false;
      }

      
      x += dis;
    }

    y += dis-10;
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
    for(let j = 0; j < dActive[i].length; j++){
      if(dActive[i][j] === true){
        fill(255, 240, 31);
        ellipse(dx[i][j], dy[i][j], dsize);
      }
    
    }
  }

}


function mousePressed(){
  console.log(mouseX, mouseY);
}
