var debug = false;

// Arrays
bullets = [];
missiles = [];
ammoBoxes = [];
fires = [];
explosions = [];
enemies = [];

function preload() {
	myFont = loadFont("Assets/Fonts/Pixel.ttf");
	hud = loadImage("Assets/IngameO.png");
	ak47 = loadImage("Assets/ak47.png");
	glock = loadImage("Assets/glock19.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	pistol = new Pistol();
	enemies.push(new Enemy());
	enemies.push(new Enemy());
	enemies.push(new Enemy());
	enemies.push(new Enemy());
	rectMode(CENTER);
	ellipseMode(RADIUS);
	cursor(CROSS);

	ammoBoxes.push(new AmmoBox());
}

function draw() {
	background(150);

	if (!focused) {
		frameRate(1);
	} else {
		frameRate(60);
	}

	for (var i = 0; i < ammoBoxes.length; i++) {
		ammoBoxes[i].show();
		if (dist(player.x, player.y, ammoBoxes[i].x, ammoBoxes[i].y) < player.r+ammoBoxes[i].r) {
			if (ammoBoxes[i].type == "secondary") {
				pistol.addAmmo();
			}
			ammoBoxes.splice(i, 1);
		}
	}
	for (var i = 0; i < enemies.length; i++) {
		if (!enemies[i].dead) {
			enemies[i].update();
			enemies[i].show();
		}
		if (enemies[i].health <= 0) {
			enemies[i].dead = true;
		}
	}


	if (!player.dead) {
		player.show();
		player.update();
	} else {
		textSize(50);
		fill(0);
		text("Dead!", width/2, height/3);
		fill(255);
		textSize(12);
	}

	if (player.health <= 0) {
		player.dead = true;
	}

	pistol.show();
	pistol.update();

	if (keyIsDown(27)) {
		ammoBoxes.push(new AmmoBox());
	}

	for (var i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].show();

		for (var j = 0; j < enemies.length; j++) {
			if (dist(bullets[i].pos.x, bullets[i].pos.y, enemies[j].x, enemies[j].y) < bullets[i].r+enemies[j].r) {
				enemies[j].health -= bullets[i].damage;
				bullets[i].dead = true;
			}
		}

		if (bullets[i].dead) {
			bullets.splice(i, 1);
		}
	}

	for (var i = 0; i < fires.length; i++) {
		fires[i].update();
		fires[i].show();
		if (fires.length > 800) {
			fires.splice(i, 1);
		}
		if (fires[i].fade < 0) {
			fires.splice(i, 1);
		}
	}

	for (var i = 0; i < explosions.length; i++) {
		explosions[i].show();
	}

	for (var i = 0; i < missiles.length; i++) {
		missiles[i].show();
		missiles[i].update();

		if (missiles[i].lifeLength > 1000) {
			missiles[i].explode();
			missiles[i].dead = true;
		}

		for (var j = 0; j < bullets.length; j++) {
			if (dist(bullets[j].pos.x, bullets[j].pos.y, missiles[i].pos.x, missiles[i].pos.y) < bullets[j].r+missiles[i].r) {
				missiles[i].health -= bullets[j].damage;
				bullets[j].dead = true;
			}
		}

		if (missiles[i].health <= 0) {
			missiles[i].explode();
			missiles[i].dead = true;
			ammoBoxes.push(new AmmoBox());
			ammoBoxes.push(new AmmoBox());
		}

		if (dist(missiles[i].pos.x, missiles[i].pos.y, player.x, player.y) < player.r+missiles[i].r) {
			missiles[i].explode();
			player.health -= missiles[i].damage;
			missiles[i].dead = true;
		}
		for (var j = 0; j < enemies.length; j++) {
			if (dist(missiles[i].pos.x, missiles[i].pos.y, enemies[j].x, enemies[j].y) < enemies[j].r+missiles[i].r) {
				if (missiles[i].lifeLength > 45) {
					missiles[i].explode();
					enemies[j].health -= missiles[i].damage;
					missiles[i].dead = true;
				}
			}
		}

		if (missiles[i].dead) {
			missiles.splice(i, 1);
		}
	}

	// HUD
	image(hud, 0, 0, windowWidth, windowHeight);
	image(ak47, 175, height-110, ak47.width-1050, ak47.height-380);
	image(glock, 175, height-50, glock.width-1400, glock.height-950);

	textSize(18);
	if (frameRate() < 50) {
		fill(255, 0, 0);
	} else {
		fill(0, 255, 0);
	}
	text("FPS: " + int(frameRate()), 35, 20);
	fill(255);

	if (debug) {
		fill(255, 0, 0);
		text("Debug Mode", 55, 40);
		fill(255);
	}
}

function keyTyped() {
	if (key === ' ') {
		for (var i = 0; i < enemies.length; i++) {
			if (!enemies[i].dead) {
				missiles.push(new Missile(enemies[i].x, enemies[i].y, enemies[i].bearing, pistol.damage));
			}
		}
	}
	return false;
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		if (debug) {
			debug = false;
		} else {
			debug = true;
		}
	}
}

function mousePressed() {
	if (!player.dead)
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
