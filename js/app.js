
//Variable declarations for sizes of the grids
var xBlock = 101;
var yBlock = 171;
var canvasWidth = yBlock * 5;
var xStart = xBlock/0.5;
var yStart = yBlock/0.42;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // The image/sprite for our enemies, this uses
    // a helper provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    // Enemies random speed
    this.speed = 200 + 100 * Math.random();
}

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemies positioning after moving off the game's grids and reappear on the left again
    if (this.x > canvasWidth) {
        this.x = -80;
    }

    // Enemies boundaries for collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 50;
    this.bottom = this.y + 50;

    this.checkCollision(this, player);
}

// Reset player's position after a collision
Enemy.prototype.checkCollision = function(enemy, player) {
    if (this.isColliding(enemy, player)) {
        player.resetPosition();
    }
}

// Check for collision
Enemy.prototype.isColliding = function(enemy, player) {
    return !(player.right < enemy.left ||
            player.left > enemy.right ||
            player.top > enemy.bottom ||
            player.bottom < enemy.top);

}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player in the game
var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';

    // Player's start position
    this.x = xStart;
    this.y = yStart;
}

Player.prototype.update = function(dt) {
    // Players boundaries for collision detection
    this.left = this.x;
    this.right = this.x + 70;
    this.top = this.y;
    this.bottom = this.y + 50;
}

// Reset the player to its starting position when player collided
// with an enemy or when player successfully reaches the water
Player.prototype.resetPosition = function() {
    this.x = xStart;
    this.y = yStart;
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Keyboard input for player's movement in the game
Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        if (this.x > xBlock/2) {
            this.x -= xBlock;
        }
    }
    if (direction === 'up') {
        if (this.y > yBlock/2) {
            this.y -= yBlock/2;
        }
        else {
            this.resetPosition();
        }
    }
    if (direction === 'right') {
        if (this.x < xBlock*3.5) {
            this.x += xBlock;
        }
    }
    if (direction === 'down') {
        if (this.y < yBlock*2) {
            this.y += yBlock/2;
        }
    }
}

//Initialise all enemies
var allEnemies = [];

var allEnemies = [
                  new Enemy(300, 60),
                  new Enemy(-200, 145),
                  new Enemy(100, 225),
                  ];

//Initialise player
var player = new Player(xStart, yStart);

// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});