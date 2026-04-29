let bg;

function preload(){
  img = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);
  img.loadPixels();
  setItem();
  setEnemies(5 + gamecnt);
}

// 아이템 데이터
let dx = [];
let dy = [];
let dsize = 15;
let dActive = [];

// 점수 데이터
let gamecnt = 0;
let score = 0;
let energy = 3;
let gameState = 0;  //0: 게임중, 1: 승리, 2: 게임오버

// 팩맨 데이터
let px = 420;
let py = 770;
let pd = 40;
let speed = 10;

// 적 데이터
let enemies = [];
let esize = 40;


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
  let dr = dsize/2 + 7;

  let dpoints = [
    // {x: x-dr, y: y},
    // {x: x+dr, y: y},
    // {x: x, y: y-dr},
    // {X: x, y: y+dr}
    [0, 0],
    [-dr, 0], [dr, 0], [0, -dr], [0, dr],
    [-dr, -dr], [dr, -dr], [-dr, dr], [dr, dr]
  ];

  for(let p of dpoints){  
    // let ix = floor(p.x);
    // let iy = floor(p.y);
    let ix = floor(x + p[0]);
    let iy = floor(y + p[1]);

    if(ix < 0 || iy < 0 || ix >= img.width || iy >= img.height){
      return false;
    }

    let index = (ix + iy * img.width) * 4;

    let rColor = img.pixels[index];
    let gColor = img.pixels[index+1];
    let bColor = img.pixels[index+2];

    if(rColor > 100 || gColor > 100 || bColor > 100){ //하늘색벽 거르기
      return false;
    }

    if(bColor < 10){  // 검정색 거르기
      return false;
    }

    
  }
  return true;

}

function setItem(){
  let x;
  let y = 130;
  let dis = 79;
  
  for(let li = 0; li < 16; li++){ //세로
    
    x = 440;
    dActive[li] = [];
    dx[li] = [];
    dy[li] = [];
    for(let i = 0; i < 26; i++){  // 가로
      if(checkPath(x, y)){
        dx[li][i] = x;
        dy[li][i] = y;
        dActive[li][i] = true;
      }else{
        dActive[li][i] = false;
      }

      
      x += dis;
    }

    y += dis+7;
  }

}

function setEnemies(n){
  let cnt = 0;

  while(cnt < n){
    let x = random(width);
    let y = random(height);

    if(checkPath(x, y) && !isOnItem(x, y)){

      let valid = true;
      for(let e of enemies){
        let d = dist(x, y, e.x, e.y);
        if(d < 100){
          valis = false;
          break;
        }
      }

      if(valid){
        enemies.push({x: x, y: y});
        cnt++;
      }
    }
  }
}

function isOnItem(x, y){
  for(let i = 0; i < dActive.length; i++){
    for(let j = 0; j < dActive[i].length; j++){
      if(dActive[i][j]){
        let d = dist(x, y, dx[i][j], dy[i][j]);
        if(d < (dsize/2 + 20)){ // 여유값
          return true;
        }
      }
    }
  }
}

let invincible = 0; //무적판정

// 적 충돌 체크
function checkEnemyCollision(){
  if(invincible > 0){
    invincible--;
    return;
  }

  for(let e of enemies){
    let d = dist(px, py, e.x, e.y);

    if(d < (pd/2 + esize/2)){
      energy--;
      invincible = 120;

      break;
    }
  }
}

function checkWin(){
  for(let i = 0; i < dActive.length; i++){
    for(let j = 0; j < dActive[i].length; j++){
      if(dActive[i][j] === true){
        return false;
      }
    }
  }

  return true;
}

function showWin(){

}

function showGameOver(){

}

function draw() {
  
  background(img);
  fill(255, 255, 0);
  textSize(50);
  text("점수: " + score, 10, 50);
  fill(255, 0, 0);
  text("에너지: " + energy, 10, 100);

  if(gameState === 0){

    // 팩맨이동
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
  
    //화면 워프
    let warpTop = 720;
    let warpBottom = 800;
    if( py > warpTop && py < warpBottom ){
      if(px < 0){
        px = width - 10;
      }
      if(px > width){
        px = 10;
      }
    }
  
    // 아이템 충돌 감지
    for(let i = 0; i < dActive.length; i++){
      for(let j = 0; j < dActive[i].length; j++){
        if(dActive[i][j] === true){
          fill(255, 240, 31);
          ellipse(dx[i][j], dy[i][j], dsize);
  
          let distance = dist(px, py, dx[i][j], dy[i][j]);
    
          if( distance < (pd / 2) + (dsize / 2)){
            dActive[i][j] = false;
            score = score + 1;
          }
        }
  
      
      }
    }
  
    checkEnemyCollision();
  }

  // 적 생성
  for(let e of enemies){
    fill(255, 7, 58);
    ellipse(e.x, e.y, esize);
  }

    //팩맨
  fill(255, 255, 0);
  ellipse(px, py, pd);

  if(gameState === 1){
    showWin();
  }

  if(gameState === 2){
    showGameOver();
  }

}


function mousePressed(){
  console.log(mouseX, mouseY);
}
