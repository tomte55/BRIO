

function preload() {

}

bullets = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	pistol = new Pistol();
	rectMode(CENTER);
	ellipseMode(RADIUS);
	cursor(CROSS);
}

function draw() {
	background(150);

	player.show();
	player.update();


	pistol.show();
	pistol.update();

	for (var i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].show();

		if (bullets[i].dead) {
			bullets.splice(i, 1);
		}
	}

}


function mousePressed() {
	bullets.push(new Bullet(player.x, player.y, player.bearing));
}
