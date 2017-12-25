function Window() {
  this.pos = createVector(155, 255);
  this.xs = 300;
  this.ys = 400;

  this.update = function() {

  }

  this.show = function() {
    fill(0, 0, 0, 50);
    rect(this.pos.x, this.pos.y, this.xs, this.ys, 10); // Actuall window

    fill(0, 0, 0, 50);
    rect(this.pos.x, this.pos.y-this.ys/2+10, this.xs, 20, 20, 20, 0, 0); // Bar at the top of window
    fill(0);
    text("Debug", this.pos.x, this.pos.y-this.ys/2+15); // Debug text on top bar
    textAlign(LEFT);

    // Health
    if (debug.health) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.pos.x-this.xs/2+20, this.pos.y-this.ys/2+45, 20, 20, 5); // Health debug checkbox
    fill(0);
    text("Infinite health", this.pos.x-this.xs/2+45, this.pos.y-this.ys/2+52);

    // Stamina
    if (debug.stamina) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.pos.x-this.xs/2+20, this.pos.y-this.ys/2+45*2, 20, 20, 5); // Stamina debug checkbox
    fill(0);
    text("Infinite stamina", this.pos.x-this.xs/2+45, this.pos.y-this.ys/2+95);

    // Colliders
    if (debug.collider) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.pos.x-this.xs/2+20, this.pos.y-this.ys/2+45*3, 20, 20, 5); // Collider spheres debug checkbox
    fill(0);
    text("Show colliders", this.pos.x-this.xs/2+45, this.pos.y-this.ys/2+140);

    // Ammo
    if (debug.ammo) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.pos.x-this.xs/2+20, this.pos.y-this.ys/2+45*4, 20, 20, 5); // Ammo debug checkbox
    fill(0);
    text("Infinite ammo", this.pos.x-this.xs/2+45, this.pos.y-this.ys/2+185);

    // Optimization
    if (debug.optimization) {
      fill(0, 0, 0, 200);
    } else {
      fill(0, 0, 0, 50);
    }
    rect(this.pos.x-this.xs/2+20, this.pos.y-this.ys/2+45*5, 20, 20, 5); // Optimization debug checkbox
    fill(0);
    text("Disable optimization", this.pos.x-this.xs/2+45, this.pos.y-this.ys/2+230);

    textAlign(CENTER);
  }
}
