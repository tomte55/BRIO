function Player() {
  this.x = 250;
  this.y = 250;
  this.xs = 50;
  this.ys = 50;


  this.show = function() {
    rect(this.x, this.y, this.xs, this.ys);
  }
}
