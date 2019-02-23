let bubble = [];
let BOSS;
let mover = 2;
function setup() {
    createCanvas(600, 400);
    BOSS = new Boss();
    //print(bubble.x, bubble.y);
}

function draw() {
    
    background(180);
    for(let projectile of bubble)
    {
        projectile.show();
        projectile.move();
        BOSS.is_shot(projectile);
    }
    BOSS.show();
    BOSS.move();
    print(BOSS.health);
    //print(bubble.length);
}



class Bubble {
    constructor(r) {
        this.x = mouseX;
        this.y = mouseY;
        this.r = r;
        
    }
    
    show() {
        stroke(255);
        strokeWeight(2);
        //noFill();
        fill(51);
        ellipse(this.x, this.y, this.r * 2);
    }
    
    move() {
        this.x += random(-2, 2);
        if (this.y - 5 > 0) this.y -= 5;
        else bubble.shift();
        //this.r += random(-3, 3);
    }
    

}

class Boss {
    constructor() {
        this.x = 250;
        this.y = 50;
        this.health = 5;
        
        
    }
    
    show() {
        stroke(255);
        strokeWeight(2);
        //noFill();
        fill(120, 200, 121, 200);
        rect(this.x, this.y, 20 * this.health, 10 * this.health);
    }
    
    move() {
        if (this.x + 20 * this.health > 600 || this.x < 0) {
            mover = -1 * mover;
        }
        this.x += mover;
        //this.r += random(-3, 3);
    }
    
    take_damege() {
        
        bubble.shift();
        this.health--;
        
    }
    
    
    distance(projectile) {
         let s = projectile.y - this.y - 10 * this.health;
         return Math.abs(s);
        
    }
    
    intersects(projectile) {
       if(this.distance(projectile) < projectile.r && projectile.x > this.x && projectile.x < this.x + 20 * this.health)
       {
           return 1;
       }
        
       if (dist(projectile.x, projectile.y, this.x, this.y + 10 * this.health) < projectile.r - 1 || dist(projectile.x, projectile.y, this.x + 20 * this.health, this.y + 10 * this.health) < projectile.r)
        {
               return 1;
        } 
        return 0;
    }
    
    
    
    is_shot(projectile) {
        if(this.intersects(projectile)) 
        {
            print("Damaged");
            this.take_damege();
        }
    }
    

}

function mousePressed() {
    //bubble[index] = new Bubble(10);
    let b = new Bubble(6);
    bubble.push(b);
}