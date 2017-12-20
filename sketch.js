var x = 0;
var y = 0;
var r = 50;

var printed = false;

function setup() {
	createCanvas(500, 500);
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
