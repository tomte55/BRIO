function Explosion(x, y) {
  this.pos = createVector(x, y);

  this.booms = 0;


  this.show = function() {
    if (this.booms < 10) {
      fires.push(new Fire(this.pos.x, this.pos.y, 20, 25));
    }
    this.booms++
  }
}
