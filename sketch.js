var debug = false;

// Arrays
bullets = [];
ammoBoxes = [];

function preload() {
	myFont = loadFont("Assets/Fonts/Plane Crash.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	pistol = new Pistol();
	rectMode(CENTER);
	ellipseMode(RADIUS);
	cursor(CROSS);

	ammoBoxes.push(new AmmoBox());
}

function draw() {
	background(150);

	for (var i = 0; i < ammoBoxes.length; i++) {
		ammoBoxes[i].show();
		if (dist(player.x, player.y, ammoBoxes[i].x, ammoBoxes[i].y) < player.r+ammoBoxes[i].r) {
			if (ammoBoxes[i].type == "secondary") {
				pistol.addAmmo();
			}
			ammoBoxes.splice(i, 1);
		}
	}

	player.show();
	player.update();


	pistol.show();
	pistol.update();

	if (keyIsDown(27)) {
		ammoBoxes.push(new AmmoBox());
	}

	for (var i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].show();

		if (bullets[i].dead) {
			bullets.splice(i, 1);
		}
	}
}


function mousePressed() {
	if (pistol.equipped) {
		if (pistol.ammoClip > 0) {
			if (!pistol.reloading) {
				bullets.push(new Bullet(player.x, player.y, player.bearing, pistol.damage));
				pistol.ammoClip--;
			}
		}
		if (pistol.ammoClip == 0) {
			pistol.reload();
		}
	}
}
