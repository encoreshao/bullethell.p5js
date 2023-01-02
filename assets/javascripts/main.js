const STATUS_BAR_H = 20;
const WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 800;

let bullets = [];
let enemies = [];
let stars = [];
let score = 0;
let level = 1;

function setup() {
  let c = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  c.parent('game');

  resetGame();
}

function resetGame() {
  bullets = [];
  enemies = [];
  stars = [];
  score = 0;
  level = 1

  initGame();
}

function updateGameLevel() {
  bullets = [];
  enemies = [];
  stars = [];

  initGame();
}


function initGame() {
  if (!isLooping()) loop();

  for (let i = 0; i < 15; i++) addEnemy();
  describe("spawn enemies");
  drawStars();
}

function addEnemy() {
  enemies.push({ x: random(20, width - 20), y: random(-800, 0) });
}

function drawStars() {
  for (let i = 0; i < 200; i++) {
    let star = {
      x: random(STATUS_BAR_H * 2, width - STATUS_BAR_H),
      y: random(STATUS_BAR_H * 2, height - STATUS_BAR_H * 2),
    };

    stars.push(star);
  }
  describe("spawn stars");
}

function draw() {
  textFont("Georgia");
  background("#0C0C0C");
  describe("canvas with #0C0C0C background");

  noStroke();
  textSize(24);
  textAlign(LEFT);
  fill("rgb(250,252,250)");
  text("score: " + score, 30, STATUS_BAR_H * 2);
  describe("add score on header");

  fill("#FFEB3B");
  textAlign(RIGHT);
  textSize(14);
  text("Press 'r' to restart", width - 30, STATUS_BAR_H * 2);
  describe("add action tips on header");

  strokeWeight(2);
  stroke(255);
  line(0, 60, width, 60);
  line(0, height - 80, width, height - 80);
  describe("add lines for header and bottom");

  strokeWeight(5);
  stroke("#FFEB3B");
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width, 0, width, height);
  line(0, height, width, height);
  describe("draw borders for canvas");

  strokeWeight(2);
  stroke(255);
  fill("#610687");
  circle(mouseX, height - 40, 40);
  describe("draw the player");

  for (let bullet of bullets) {
    bullet.y -= 10;

    buildCircle(bullet, 5, "#E91E63", 10);
  }
  describe("update and draw the bullets");

  for (let enemy of enemies) {
    enemy.y += level;

    buildCircle(enemy, 15, "#4CAF50", 8);
    if (enemy.y > height) gameOver();
  }
  describe("update and draw enemies");

  for (let star of stars) {
    // star.y += 2;

    strokeWeight(2);
    stroke("#F7FDF7");
    fill("#F6F6F6");
    point(star.x, star.y, 5);
  }
  describe("update and draw stars");

  document.getElementById('level').innerText = 'Level: ' + level;
  document.getElementById('score').innerText = 'Score: ' + score;

  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 10) {
        enemies.splice(enemies.indexOf(enemy), 1);
        bullets.splice(bullets.indexOf(bullet), 1);

        addEnemy();
        score += 1;

        document.getElementById('score').innerText = 'Score: ' + score;
        if (score % 100 === 0) {
          increaseLevel()
          updateGameLevel()
        }
      }
    }
  }

  describe("deal with collisions");
}

function increaseLevel() {
  level += 1;
}

function buildCircle(item, sWeight, color, cSize) {
  strokeWeight(sWeight);
  stroke(color);
  fill(color);
  circle(item.x, item.y, cSize);
}

function gameOver() {
  strokeWeight(1);
  stroke("rgb(2,2,2)");
  fill("white");
  textSize(50);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}

function mousePressed() {
  bullets.push({ x: mouseX, y: height - 50 });
  // stars.push({x: mouseX, y: height - 50});
  describe("spaw a bullet when the user clicks");
}

function keyPressed() {
  // if (keyCode === 32) {
  //   resetGame();
  // }
  // describe("when the user clicks `space` keyboard");
  if (key === "r") resetGame();
}
