function Window() {
  this.x = 155;
  this.y = 255;
  this.xs = 300;
  this.ys = 400;




  this.update = function() {

  }

  this.show = function() {
    fill(0, 0, 0, 50);
    rect(this.x, this.y, this.xs, this.ys, 10);
    fill(0, 0, 0, 50);
    rect(this.x, this.y-this.ys/2+10, this.xs, 20, 20, 20, 0, 0);
    fill(0);
    text("Debug", this.x, this.y-this.ys/2+15);
    textAlign(LEFT);
    // Health
    if (debug.health) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.x-this.xs/2+20, this.y-this.ys/2+45, 20, 20, 5);
    fill(0);
    text("Health", this.x-this.xs/2+45, this.y-this.ys/2+52);

    // Stamina
    if (debug.stamina) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.x-this.xs/2+20, this.y-this.ys/2+45*2, 20, 20, 5);
    fill(0);
    text("Stamina", this.x-this.xs/2+45, this.y-this.ys/2+95);

    // Colliders
    if (debug.collider) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.x-this.xs/2+20, this.y-this.ys/2+45*3, 20, 20, 5);
    fill(0);
    text("Colliders", this.x-this.xs/2+45, this.y-this.ys/2+140);

    // Ammo
    if (debug.ammo) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.x-this.xs/2+20, this.y-this.ys/2+45*4, 20, 20, 5);
    fill(0);
    text("Ammo", this.x-this.xs/2+45, this.y-this.ys/2+185);

    // Optimization
    if (debug.optimization) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.x-this.xs/2+20, this.y-this.ys/2+45*5, 20, 20, 5);
    fill(0);
    text("Disable optimization", this.x-this.xs/2+45, this.y-this.ys/2+230);

    textAlign(CENTER);
  }
}
