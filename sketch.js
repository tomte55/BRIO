var x = 0;
var y = 0;
var r = 50;

function setup() {
	createCanvas(1000, 1000);
	rectMode(CENTER);
	frameRate(5);
}

function draw() {
	background(150);

	// Ritar en Rektangel i mitten av skärmen
	ellipse(x, y, r,);

}


function mousePressed() {
	x = mouseX;
	y = mouseY;
}
