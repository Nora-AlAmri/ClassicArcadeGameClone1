// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images


 //Used this variable to control in arrows keys 
let  keysIsRunning = true; 

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';

        // Use Math.random >>> to make a rate of movement randomly
        this.speed = 150 + Math.floor(Math.random() * 200);
    }
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > ctx.canvas.width) {
            this.x = 0;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x - 50, this.y - 110);
    }
}

// Update the enemy's position, required method for game
let enemy1 = new Enemy(200,175);
let enemy2 = new Enemy(200,255);
let enemy3 = new Enemy(200,340);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.char = 'images/char-princess-girl.png';
    }
    update(dt) {
    }
    render() {
        ctx.drawImage(Resources.get(this.char), this.x - 50, this.y - 100);

    }
    // Method to set and control arrows keys 
    handleInput(pressedKey) {

     // Used keysIsRunning variable to allow keys work  
        if(keysIsRunning){

        // Adjust keys arrows here .....
        if (pressedKey == 'left' && this.x > 50) {
            this.x -= 100;
        }
        if (pressedKey == 'up' && this.y > 100) {
            this.y -= 100;
        }
        if (pressedKey == 'right' && this.x < 400) {
            this.x += 100;
        }
        if (pressedKey == 'down' && this.y < 500) {
            this.y += 100;
        }
    }
}
}

// Class of stars that will show on canves... 
class Stars {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.star = 'images/Star.png';
    }
    update(dt) {
    }

    render() {
        ctx.drawImage(Resources.get(this.star), this.x-50, this.y-100);

    }
}

// Stars objects 
let star1 = new Stars(352,170);
let star2 = new Stars(150,255);
let star3 = new Stars(252,340);
let star4 = new Stars(450,340);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies =[];
allEnemies.push(enemy1,enemy2,enemy3);

// Place the player object in a variable called player
let player = new Player(250,500);

// Stars objects ....
let allStars =[];
allStars.push(star1,star2,star3,star4);

//Check Collision between bugs/stars & player by use (distnaceFunc) ...

function checkCollisions(){

    allEnemies.forEach(bug => {

         if(distnaceFunc(bug , player)< 49 ) {
            player.x = 250;
            player.y= 500;
         }  

  }); 

  allStars.forEach((star ,index)=> {
    if(distnaceFunc(star , player)< 49 ) {

// Delete a stars from array ..
    allStars.splice(index,1);

// If all stars are collected by player then show dailog box and stop the game 
    if (allStars.length == 0 ){

        keysIsRunning= false; // Stop control in keys..
        allEnemies.length=0; // Remove enemies from array.. 
        player.x = 250;     // Reset a player position ..
        player.y= 500;
        showdailog(); // Call a method showdailog ...
    }
   }
     });
}
 
 //Compute a distnace between 2 points to get collision point...
function distnaceFunc(coordinatesOfFirstPoint,coordinatesOfSecondPoint) {

    var a = coordinatesOfFirstPoint.x - coordinatesOfSecondPoint.x;
    var b = coordinatesOfFirstPoint.y - coordinatesOfSecondPoint.y;
    
    return Math.sqrt(a*a + b*b);
  
    }

// Show dailogBox when a player collected all stars...
function  showdailog(){

    let dilogBox = document.querySelector("#dialog-box");
    dilogBox.showModal();
}

// Enable close dailog..
function  closedailog(){
document.querySelector("#dialog-box").close();
} 
    
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
  
    player.handleInput(allowedKeys[e.keyCode]);

});



