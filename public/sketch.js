var socket;

/*var express = require("express");
var app = express();
var server = app.listen("3000");
app.use(express.static("public"));

console.log("Socerk Server is running");

var socket = requre("socket.io");
var io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
	console.log(socket);
}*/



var u;
var l;
var a;
var mods = [];
var x;
var y;
var count;




var slider1anchorX;
var slider1anchorY;

var slider1controlpointX;
var slider1controlpointY;

var slider2controlpointX;
var slider2controlpointY;

var slider2anchorX;
var slider2anchorY;

var sliderlineWeight;

var easing = 0.01;
var targetX;
var targetY;

var modY;
var modX;

function setup() {
  createCanvas(windowWidth, windowHeight);7
  colorMode(RGB,255,255,255,1);
  //u = int(width/15);
  u = 100;
  l = 100;
  var highCount = height/80;
  var wideCount = width/80;
  count = int(highCount * wideCount);
  
  var index = 0;
  for (var xc = 0; xc < wideCount; xc++) {
    for (var yc = 0; yc < highCount; yc++) {
      mods[index++] = new Module(int(xc)*u,int(yc)*u);
    }
   }
	
	slider1anchorX = createSlider(0, 1000, 500);
	slider1anchorX.position(20, 20);
	slider1anchorX.value(0);
	slider1anchorX.hide();
	
	slider1anchorY = createSlider(0, 1000, 500);
	slider1anchorY.position(20, 40);
	slider1anchorY.value(0);
	slider1anchorY.hide();
	
	slider1controlpointX = createSlider(0, 1000, 500);
	slider1controlpointX.position(20, 60);
	slider1controlpointX.value(1000);
	slider1controlpointX.hide();
	
	slider1controlpointY = createSlider(0, 1000, 500);
	slider1controlpointY.position(20, 80);
	slider1controlpointY.value(1000);
	slider1controlpointY.hide();
	
	slider2controlpointX = createSlider(0, 1000, 500);
	slider2controlpointX.position(20, 100);
	slider2controlpointX.value(1000);
	slider2controlpointX.hide();
	
	slider2controlpointY = createSlider(0, 1000, 500);
	slider2controlpointY.position(20, 120);
	slider2controlpointY.value(1000);
	slider2controlpointY.hide();
	
	slider2anchorX = createSlider(0, 1000, 500);
	slider2anchorX.position(20, 140);
	slider2anchorX.value(0);
	slider2anchorX.hide();
	
	slider2anchorY = createSlider(0, 1000, 500);
	slider2anchorY.position(20, 160);
	slider2anchorY.value(0);
	slider2anchorY.hide();
	
	
	sliderlineWeight = createSlider(0, 100, 100);
	sliderlineWeight.position(20, 200);
	sliderlineWeight.value(20);
	sliderlineWeight.hide();
	
	leader = new Leader();
	targetX = random(windowWidth);
	targetY = random(windowHeight);
	
	
	socket = io.connect();
	socket.on("mouse", newDrawing);

	

}

function newDrawing(data) {
	console.log("Receiving x "+ data.targetx + "Receiving y " + data.targety);
	targetX = data.targetx;
	targetY = data.targety;
}






/*function mouseDragged() {
	console.log('Sending ' + mouseX + ',' + mouseY);
	
	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit("mouse", data);
}*/


function mousePressed() {
	//targetX = mouseX;
	//targetY = mouseY;
	
	var data = {
		targetx: mouseX,
		targety: mouseY
	}
	socket.emit("mouse", data);
	
}



function draw() {
  
  
  

	
	
	
  //background(255, 255, 255, 1);
	background(0);
  strokeWeight(sliderlineWeight.value()/100);
  //stroke(255,163,163);
	stroke(255);
  //translate(20, 20);
  
  for (var i = 0; i <= count; i++) {
    mods[i].update();
    mods[i].draw2();
  }
leader.display();
	
	leader.x += (targetX - leader.x) * easing;
	leader.y += (targetY - leader.y) * easing;
	
	//if (mouseIsPressed) {
    
  //} else {

 // }
	
	
}











function Module(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;
  }





Module.prototype.update = function() {
  if (mouseIsPressed) {
    //this.a = -20 * (atan2(mouseY-this.y, mouseX-this.x));
  } else {
	 //leader.x += (targetX - leader.x) * easing;
	//leader.y += (targetY - leader.y) * easing;
	  
    //this.a = atan2(mouseY-this.y, mouseX-this.x);
	  
	  this.modY = targetY-this.y;
	  this.modX = targetX-this.x;
	  
	  //this.a = atan2(this.y+=(this.modY-this.y) * easing, this.x+=(this.modX-this.x) * easing);
	  
	  this.a = atan2(leader.y-this.y, leader.x-this.x);
	  
	  /*var data = {
            mx: mouseX,
            my: mouseY,
		  	leaderx: leader.x,
		  	leadery: leader.y,
      };
	  socket.emit('mouse', data);*/
	  
	  //this.updateFromServer = function (mx, my, leaderx, leadery) {
    	//if ( ( (_x > this.x) && (_x < this.x + this.w) ) && ( (_y > this.y) && (_y < this.y + this.h) ) ) {
      		//this.a = atan2(leaderx-this.y, leadery-this.x);
    	//}
  	//};
  }
}





Module.prototype.draw2 = function() {
  push();
  translate(this.x, this.y);
  rotate(this.a);
  //line(-l,0,l,0);
	//bezier(mouseX-(i/2.0), 40+i, 410, 20, 440, 300, 240-(i/16.0), 300+(i/8.0));
	
	noFill();

//bezier(85, 20, 10, 10, 90, 90, 15, 80);
	for (var i = 0; i < 2; i += 2) {
   
		
		
		//bezier(-l, 0, slider1controlpointX.value(), slider1controlpointY.value(), slider2controlpointX.value(), slider2controlpointY.value(), l, 0);
		
		bezier(-l, 0, slider1controlpointX.value(), slider1controlpointY.value(), slider2controlpointX.value(), slider2controlpointY.value(), l, 0);
		
		
		
		
  }
	
  pop();
}




function Leader() {
	this.x = random(windowWidth);
	this.y = random(windowHeight);
	this.display = function() {
		//fill(255);
		noFill();
		noStroke();
		ellipse(this.x, this.y, 50, 50);
	}
}































function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// Console
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function keyPressed() {
	if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}

function keyTyped() {
	//if (key == 's' || key == 'S') save("P_2_2_3_01.png");
	//if (key == '1') filled = false;
	//if (key == '2') filled = true;
	// switch draw loop on/off
	//if (key == 'f' || key == 'F') freeze = !freeze;
	//if (freeze == true) noLoop();
	//else loop();
	
	if (key == 'c') {
		slider1anchorX.show();
		slider1anchorY.show();
		slider1controlpointX.show();
		slider1controlpointY.show();
		slider2controlpointX.show();
		slider2controlpointY.show();
		slider2anchorX.show();
		slider2anchorY.show();
		sliderlineWeight.show();
	} else if(key == 'h') {
		slider1anchorX.hide();
		slider1anchorY.hide();
		slider1controlpointX.hide();
		slider1controlpointY.hide();
		slider2controlpointX.hide();
		slider2controlpointY.hide();
		slider2anchorX.hide();
		slider2anchorY.hide();
		sliderlineWeight.hide();
	}
	
	

}







window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
}

























