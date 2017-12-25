function AmmoBox() {
  this.x = int(random(width));
  this.y = int(random(height));
  this.r = 15;

  this.types = ["primary", "secondary"]; // Ammo types

  // this.type = random(this.types); // Select random ammo type
  this.type = "secondary";

  this.show = function() {
    push();
    strokeWeight(1);
    translate(this.x, this.y);
    if (debug.collider) {
      noFill();
      ellipse(0, 0, this.r); // Sphere Collider
    }
    if (this.type == "secondary") {
      fill(60, 150, 50);
    } else {
      fill(60, 90, 255);
    }
    rect(0, 0, 25, 15); // Actuall ammobox
    text(this.type, 0, 20); // Ammo type text
    pop();
  }
}
