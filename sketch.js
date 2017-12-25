// Debug options
var debug = {
	enabled: false,
	ammo: false,
	health: false,
	stamina: false,
	collider: false,
	objects: false,
	optimization: false
};

// Arrays
bullets = [];
missiles = [];
ammoBoxes = [];
fires = [];
explosions = [];
enemies = [];
windows = [];

function checkMouse(x, y, xs, ys) {
	// Checks if mouse is inside a rectangle
	if (mouseX >= x-xs/2 && mouseX <= x+xs/2 && mouseY >= y-ys/2 && mouseY <= y+ys/2) {
		return true;
	}
}

function preload() {
	// Load all assets
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
}

function draw() {
	background(150);

	// If window is not in focus set the fps to 1 so its almost paused
	if (!focused) {
		frameRate(1);
	} else {
		frameRate(60);
	}

	for (var i = 0; i < ammoBoxes.length; i++) {
		ammoBoxes[i].show();

		if (dist(player.pos.x, player.pos.y, ammoBoxes[i].pos.x, ammoBoxes[i].pos.y) < player.r+ammoBoxes[i].r) {
			if (ammoBoxes[i].type == "secondary") {
				pistol.addAmmo(); // If player walks over ammobox of type "secondary" add secondary ammo
			}                   // Then remove corresponding ammobox
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
		text("Dead!", width/2, height/3); // If player is dead show dead text on screen
		fill(255);
		textSize(12);
	}

	if (player.health <= 0) {
		player.dead = true;
	}

	pistol.show();
	pistol.update();

	if (debug.enabled) {
		if (keyIsDown(27)) {
			ammoBoxes.push(new AmmoBox());
		}
	}

	for (var i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].show();

		for (var j = 0; j < enemies.length; j++) {
			if (!enemies[j].dead) {
				if (dist(bullets[i].pos.x, bullets[i].pos.y, enemies[j].pos.x, enemies[j].pos.y) < bullets[i].r+enemies[j].r) {
					enemies[j].health -= bullets[i].damage; // If bullet hits enemy remove health and remove bullet
					bullets[i].dead = true;
				}
			}
		}

		if (bullets[i].dead) {
			bullets.splice(i, 1);
		}
	}

	for (var i = 0; i < fires.length; i++) {
		fires[i].update();
		fires[i].show();
		if (!debug.optimization) {
			if (fires.length > 800) {
				fires.splice(i, 1); // If there are more than 800 fire particles start removing them for optimization
			}
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
			missiles[i].explode(); // If missile has been alive for too long make it explode
		}

		for (var j = 0; j < bullets.length; j++) {
			if (dist(bullets[j].pos.x, bullets[j].pos.y, missiles[i].pos.x, missiles[i].pos.y) < bullets[j].r+missiles[i].r) {
				missiles[i].health -= bullets[j].damage; // If bullet hits a missile remove some health from the missiles and remove the bullet
				bullets[j].dead = true;
			}
		}

		if (missiles[i].health <= 0) {
			missiles[i].explode();
			ammoBoxes.push(new AmmoBox());
			ammoBoxes.push(new AmmoBox());
		}

		if (dist(missiles[i].pos.x, missiles[i].pos.y, player.pos.x, player.pos.y) < player.r+missiles[i].r) {
			player.health -= missiles[i].damage; // If missile hits player remove health from player and explode missile
			missiles[i].explode();
		}
		for (var j = 0; j < enemies.length; j++) {
			if (dist(missiles[i].pos.x, missiles[i].pos.y, enemies[j].pos.x, enemies[j].pos.y) < enemies[j].r+missiles[i].r) {
				if (missiles[i].lifeLength > 45) {
					enemies[j].health -= missiles[i].damage;  // If missiles hits enemy ramove health from enemy and explode missile
					missiles[i].explode();
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

	for (var i = 0; i < windows.length; i++) {
		windows[i].update();
		windows[i].show();
	}

	textSize(18);
	if (frameRate() < 50) {
		fill(255, 0, 0);
	} else {
		fill(0, 255, 0);
	}
	text("FPS: " + int(frameRate()), 35, 20);	// Draw fps counter and make it green if fps above 50
	fill(255);

	if (debug.enabled) {
		fill(255, 0, 0);
		text("Debug Mode", 55, 40); // If debug mode enabled print it in red text
		fill(255);
	}
}

function keyTyped() {
	if (key === ' ') {
		for (var i = 0; i < enemies.length; i++) {
			if (!enemies[i].dead) {
				missiles.push(new Missile(enemies[i].pos.x, enemies[i].pos.y, enemies[i].bearing, pistol.damage)); // If space is pressed spawn a missile at every enemy
			}
		}
	}
	return false;
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		if (debug.enabled) {
			debug.enabled = false;
			windows.splice(0, 1);
		} else {	// Open or close debug menu
			debug.enabled = true;
			windows.push(new Window());
		}
	}
}

function mouseDragged() {
	for (var i = 0; i < windows.length; i++) {
		if (checkMouse(windows[i].pos.x, windows[i].pos.y, windows[i].xs, windows[i].ys)) {
			windows[i].pos.x = mouseX + offsetX;
			windows[i].pos.y = mouseY + offsetY;
		}
	}
}

function mousePressed() {
	for (var i = 0; i < windows.length; i++) {
		offsetX = windows[i].pos.x - mouseX;
		offsetY = windows[i].pos.y - mouseY;

		// Health debug
		if (checkMouse(windows[i].pos.x-windows[i].xs/2+20, windows[i].pos.y-windows[i].ys/2+45, 20, 20)) {
			if (debug.health) {
				debug.health = false;
			} else {
				debug.health = true;
			}
		}
		// Stamina debug
		if (checkMouse(windows[i].pos.x-windows[i].xs/2+20, windows[i].pos.y-windows[i].ys/2+45*2, 20, 20)) {
			if (debug.stamina) {
				debug.stamina = false;
			} else {
				debug.stamina = true;
			}
		}

		// Collider debug
		if (checkMouse(windows[i].pos.x-windows[i].xs/2+20, windows[i].pos.y-windows[i].ys/2+45*3, 20, 20)) {
			if (debug.collider) {
				debug.collider = false;
			} else {
				debug.collider = true;
			}
		}

		// Ammo debug
		if (checkMouse(windows[i].pos.x-windows[i].xs/2+20, windows[i].pos.y-windows[i].ys/2+45*4, 20, 20)) {
			if (debug.ammo) {
				debug.ammo = false;
			} else {
				debug.ammo = true;
			}
		}

		// Optimization debug
		if (checkMouse(windows[i].pos.x-windows[i].xs/2+20, windows[i].pos.y-windows[i].ys/2+45*5, 20, 20)) {
			if (debug.optimization) {
				debug.optimization = false;
			} else {
				debug.optimization = true;
			}
		}
	}

	if (!player.dead)
	if (pistol.equipped) {
		if (pistol.ammoClip > 0) {
			if (!pistol.reloading) {
				bullets.push(new Bullet(player.pos.x, player.pos.y, player.bearing, pistol.damage)); // Spawn new bullet at player position
				pistol.ammoClip--;
			}
		}
		if (pistol.ammoClip == 0) {
			pistol.reload();
		}
	}
}
