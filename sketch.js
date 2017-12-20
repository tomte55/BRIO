

function preload() {
	player_img = loadImage("Assets/player1.png");
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
	if (mouseX > player.x) {
		bullets.push(new Bullet(player.x, player.y, 20, 0));
	} else if (mouseX < player.x) {
		bullets.push(new Bullet(player.x, player.y, -20, 0));
	}
	// bullets.push(new Bullet(player.x, player.y, 0, 0));
}
