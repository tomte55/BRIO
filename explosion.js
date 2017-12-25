function Explosion(x, y) {
  this.pos = createVector(x, y);

  this.booms = 0;

  this.show = function() {
    if (this.booms < 10) {
      fires.push(new Fire(this.x1, this.y1, 20, 25)); // Spaw fire particles
      this.x1 = this.pos.x+random(-10, 10);
      this.y1 = this.pos.y+random(-10, 10);
    }
    this.booms++
  }
}
