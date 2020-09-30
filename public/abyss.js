var props = {
	innerRad: 15,
	outerRad: 400,
	radStep: 2.5,
	ringOffset: 0.04,
	noiseEffect: 1,
	speed: 6,
	startHue: 160,
	hueSpread: 0.2,
	opacity: 0.9,
	backColor: "#000",
	fade: 0.96,
	hue: 50,
	saturation: 0,
	lightness: 100
}
window.onload = function () {
	var gui = new dat.GUI();
	gui.add(props, 'innerRad').min(0).max(200);
	gui.add(props, 'outerRad').min(0).max(400);
	gui.add(props, 'radStep').min(1.0).max(24);
	gui.add(props, 'ringOffset').min(0.001).max(0.1);
	gui.add(props, 'noiseEffect').min(0.2).max(2.0);
	gui.add(props, 'speed').min(0).max(10);
	gui.add(props, 'startHue').min(0).max(360);
	gui.add(props, 'hueSpread').min(0).max(10).listen().onChange(function () {
		wanderHue = false;
	});
	gui.add(props, 'opacity').min(0).max(1);
	gui.addColor(props, 'backColor');
	gui.add(props, 'fade').min(0).max(1);


	gui.add(props, 'hue').min(0).max(360);
	gui.add(props, 'saturation').min(0).max(100);
	gui.add(props, 'lightness').min(0).max(100);



	gui.close();




};


///////////////////////////////////////////////////////

var targetInner;
var targetOuter;



socket = io.connect();
socket.on("mouse", newDrawing);


function newDrawing(data) {
	console.log("Receiving x " + data.targetInner + "Receiving y " + data.targetOuter);
	targetInner = data.targetInner;
	targetOuter = data.targetOuter

	props.innerRad = targetInner;
	props.outerRad = targetOuter;
}

function mousePressed() {
	props.innerRad = props.innerRad + 3;
	props.outerRad = props.outerRad + 9;





	console.log("pressed");
	var data = {
		targetInner: props.innerRad,
		targetOuter: props.outerRad
	}
	socket.emit("mouse", data);

}
///////////////////////////////////////////////////////



var wanderHue = false;
let on = false;




function setup() {
	createCanvas(windowWidth + 10, windowHeight + 10);
	smooth();
	frameRate(30);
	colorMode(HSB, 360, 100, 100, 1);
	strokeWeight(4.0);
	noFill();
	noStroke();
	ctx = canvas.drawingContext;
}

function draw() {





	var ctx = canvas.getContext('2d');

	var grd = ctx.createRadialGradient(windowWidth / 2, windowHeight / 2, 5, windowWidth / 2, windowHeight / 2, 420);
	ctx.globalAlpha = 0.4;
	grd.addColorStop(.01, '#dbb13b');
	grd.addColorStop(.01, '#dbb13b');
	grd.addColorStop(.1, '#56bda2');
	grd.addColorStop(.2, '#2494a2');
	grd.addColorStop(.3, '#304b78');
	grd.addColorStop(.4, '#2d325a');
	grd.addColorStop(1, '#0a0e29');
	ctx.fillStyle = grd;
	//ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.fillRect(0, 0, windowWidth, windowHeight);
	ctx.globalAlpha = .3;







	// fade background
	colorMode(RGB, 255, 255, 255, 1);
	var col = color(props.backColor);

	fill(color(red(col), green(col), blue(col), 1.0 - props.fade));

	rect(0, 0, width, height);
	noFill();

	if (wanderHue) {
		// move the hue spread slightly to show aliveness via color
		props.hueSpread += (noise(frameCount / 300.0) - 0.5) * 0.01;
		console.log("asdfafd");
	}

	translate(width / 2, height / 2);

	//colorMode(HSB, 360, 100, 100, 1);
	colorMode(HSB, 360, 100, 100, 20);
	var offset = 0;
	var hue = props.startHue;
	var hueStep = props.hueSpread;
	var innerRad = props.innerRad;
	for (var rad = props.innerRad; rad < props.outerRad; rad += props.radStep) {

		// HERE HERE HERE HERE HERE HERE
		// white
		//stroke(hue, 0, 100, props.opacity);

		// color
		//stroke(hue, 100, 50, props.opacity);




		// Optional Toggle
		//if (on) {
		//blue
		//stroke(152, 15, 88, props.opacity);

		//} else {
		//white
		//stroke(50, 0, 100, props.opacity)
		//}


		// Blue
		//stroke(152, 15, 88, props.opacity);


		// Color Picker
		stroke(props.hue, props.saturation, props.lightness, props.opacity);



		//stroke(hue, 100, 100, props.opacity);
		blobCircle(rad, offset);
		offset += props.ringOffset;
		hue += hueStep;
		if (hue > 360.0)
			hue = 0.0;
	}


	//////////////////////////////////////////////////////////////////////////////
	// Making smaller
	if (innerRad > 15) {
		props.innerRad = props.innerRad - .5;

	}
	if (rad > 400) {
		props.outerRad = props.outerRad - .5;

	}
	//////////////////////////////////////////////////////////////////////////////
	//console.log("innerRad = " + innerRad);
	//console.log("props.outerRad = " + props.outerRad);

}

function blobCircle(rad, ranOff) {

	beginShape();

	var step = 2;
	if (props.radStep < 8)
		step = 8;

	for (var i = 0; i < 360; i += step) {
		var x = sin(radians(i));
		var y = cos(radians(i));

		var frameDiv = map(props.speed, 0, 10, 300, 24);

		x += props.noiseEffect * (noise(ranOff + x + frameCount / frameDiv) - 0.5);
		y += props.noiseEffect * (noise(ranOff + y + frameCount / frameDiv) - 0.5);

		x *= rad;
		y *= rad;

		vertex(x, y);
	}
	endShape(CLOSE);
}



function windowResized() {
	resizeCanvas(windowWidth - 10, windowHeight - 10);
}




function keyTyped() {
	var y = year();
	var m = month();
	var d = day();
	var h = hour();
	var hours = ((h + 11) % 12) + 1;
	var mi = minute();
	var s = second();
	if (key == 's' || key == 'S') save("abyss-" + y + "-" + m + "-" + d + "_" + hours + "." + mi + "." + s + ".png");
	//if (key == '1') gui.hide();
	//if (keyCode == UP_ARROW) gui.show();
	//if (keyCode == DOWN_ARROW) gui.hide();
	//if (keyCode == LEFT_ARROW) angleSpeed -= 0.5;
	//if (keyCode == RIGHT_ARROW) angleSpeed += 0.5;
}


/*function mousePressed() {


	props.innerRad = props.innerRad + 3;
	props.outerRad = props.outerRad + 9;
	console.log("pressed");


	wanderHue = "true";
	console.log(wanderHue);

	if (on) {
		on = false;
	} else {
		on = true;
	}
}*/