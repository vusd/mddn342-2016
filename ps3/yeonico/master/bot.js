

function bot() {
  this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.weatherData;
  this.temperatures = [];


  var startList = ["A", "B", "Bl", "Br", "C", "Cl", "Ch", "Cr", "Cy", "D", "Dr", "E", "F", "Fl", "Fr", "G", "Gl", "Gr", "H", "I", "J", "K", "Kl", "Kr", "L",
  "M", "N", "O", "P", "Ph", "Pr", "Ps", "Psy", "Qu", "R", "S", "Sc", "Sh", "Sl", "Sw", "T", "Tr", "Ts", "U", "V", "W", "X", "Y", "Z"];
  var midList = ["a", "ai", "ar", "au", "e", "ee", "ei", "en", "er", "i", "ia", "ie", "io", "ir", "o", "oi", "oo", "or","ou", "oun", "u", "ua",];
  var endList = ["", "b", "c", "ch", "d", "g", "j", "k", "l", "m", "n", "p", "r", "s", "sh", "t", "v", "w", "x", "y", "z"];
  var colours = [
  color(255, 139, 152), // peachy pink
  color(255, 61, 62), // bright red
  color(255, 99, 102), // soft red
  color(255, 92, 54), // bright orange red
  color(255, 153, 103), // soft orange
  color(255, 244, 118), // yellow
  color(255, 250, 0), // bright yellow
  color(171, 255, 73), // bright lime green
  color(33, 255, 0), // bright green
  color(74, 255, 177),  // light turquoise
  color(61, 231, 255), // light blue
  color(60, 143, 255), // warm blue
  color(29, 60, 115), // dark blue
  color(162, 116, 255), // light purple
  color(86, 92, 115), // dark grey purple
  color(235, 51, 255), // hot pink
  ];
  var backCol = [
  color(255, 255, 255), // white
  color(255, 253, 216), // pale yellow
  color(216, 255, 231), // mint
  color(222, 255, 240), // pale blue turquoise
  color(242, 237, 255), // pale pink purple
  color(215, 255, 255), // pale blue
  color(255, 230, 255), // pale pink
  color(255, 251, 255)  // white pink
  ];

  // this.owl = function(x, y, g, s) {
    // push();
    // translate(x, y);
    // scale(s);  // Set the createCanvas
    // stroke(g + 100); // Set the gray value
    // strokeWeight(70);
    // line(0, -35, 0, -65); // Body
    // noStroke();
    // fill(255-g);
    // ellipse(-17.5, -65, 35, 35); // Left eye dome
    // ellipse(17.5, -65, 35, 35);  // Right eye dome
    // arc(0, -65, 70, 70, 0, PI);  // Chin
    // fill(g);
    // ellipse(-14, -65, 8, 8);  // Left eye
    // ellipse(14, -65, 8, 8);   // Right eye
    // quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
    // pop();
  // }

  this.preload = function() {
    this.weatherData = loadJSON(this.url);
  }

  this.setup = function() {

    var results = this.weatherData["query"]["results"]["channel"];
    for(var i=0;i<results.length;i++) {
      var forecast = results[i]["item"]["forecast"]
      var pair = [
        parseInt(forecast["low"], 10), parseInt(forecast["high"], 10)
      ]
      this.temperatures.push(pair)
    }
    /*
    for(i=0;i<10;i++) {
      this.temperatures.push([40, 40]);
    }
    */

    console.log(this.temperatures);
  }

  this.isDone = function() {
    return true;
  }



  this.respond = function() {


    var bodyWidth = random(40, 230);
    var bodyHeight = random(15, 80);   
    var neckWidth = random(8, 50);
    var neckLength = random(40, 100);
    var headHeight = random(10, 45);
    var headLength = random(5, 120);
    var tailLength = random(10, 130);
    var tailThickness = random(15, 40);
    var tailY = random(0, bodyHeight/3);
    var tailTipY = random(0, 60);

    if(bodyWidth + headLength > 200){
      bodyWidth = random(40, 80);
      headLength = random(5, 60);
    }

    if(bodyHeight + headHeight + neckLength > 120){
      bodyHeight = random(15, 60);
      headHeight = random(10, 35);
      neckLength = random(40, 80);
    }

    var eyeHeight = random(12, 40);
    var eyeWidth = random(12, 40);
    var eyeYpos = 10;
    var eyeXpos = 10;
    var irisHeight = eyeHeight * random(0.3, 0.95);
    var irisWidth = eyeWidth * random(0.3, 0.95);
    var pupilHeight = irisHeight * random(0.2, 0.95);
    var pupilWidth = irisWidth * random(0.2, 0.95);

    if(pupilWidth > 0.8 && pupilHeight < 0.5 && irisHeight > 0.7){
      irisHeight = eyeHeight * random(0.3, 0.5);
      pupilHeight = irisHeight * random(0.4, 0.9);
      pupilWidth = irisWidth * random(0.2, 0.7);
    }

    var legWidth = bodyWidth/6;
    var legLength = random(20, 60);
    var legBit = legLength/4;
    var legSpace = bodyWidth/20;
    var legPos = (bodyWidth + neckWidth)/4;

    if(bodyHeight + tailThickness + legLength > 100){
      bodyHeight = random(15, 60);
      tailThickness = random(8, 30);
    }

    var xPos = width/2 - bodyWidth/2;
    var yPos = height/2 - bodyHeight/2 + 15;
    var edgeCurve = random(1, 10);
    var chance = floor(random(0, 2));
    var tailChance = floor(random(0, 7));
    var tailTypeChance = floor(random(0, 2));

    //Background
    push();
    fill(backCol[floor(random(0, backCol.length))]);
    noStroke();
    rect(0, 0, 440, 220);
    pop();

    push();
    noStroke();
    fill(colours[floor(random(0, colours.length))]);
    rect(xPos, yPos, bodyWidth + neckWidth, bodyHeight + tailThickness, edgeCurve); //body
    rect(xPos + legSpace, yPos + bodyHeight + tailThickness - legBit, legWidth, legLength, edgeCurve); //legs
    rect(xPos + legSpace + legPos, yPos + bodyHeight + tailThickness - legBit, legWidth, legLength, edgeCurve);
    rect(xPos + legSpace + legPos * 2, yPos + bodyHeight + tailThickness - legBit, legWidth, legLength, edgeCurve);
    rect(xPos + legSpace + legPos * 3, yPos + bodyHeight + tailThickness - legBit, legWidth, legLength, edgeCurve); 
    rect(xPos + bodyWidth, yPos - neckLength + legBit, neckWidth, neckLength + legBit, edgeCurve); //neck

    if(tailChance > 1){
      if(tailTypeChance){
        triangle(xPos + legBit, yPos + tailY + 5, xPos + legBit, yPos + tailY + tailThickness, xPos - tailLength, yPos + tailY + tailTipY); //tail
      }
      else{
        rect(xPos + legBit - tailLength, yPos + tailY + 2, tailLength, tailThickness, edgeCurve); // other tail
      }
    }
    if(chance){
      rect(xPos + bodyWidth, yPos - neckLength + legBit, headLength + neckWidth + eyeWidth, headHeight + eyeHeight, edgeCurve); //head
    }
    else{
      ellipseMode(CORNER);
      ellipse(xPos + bodyWidth- headLength/5, yPos - neckLength + legBit - headHeight/2.5, headLength + neckWidth + eyeWidth, headHeight + eyeHeight); //head
      eyeYpos = eyeYpos - headHeight/2.5;
    }
    fill(255);
    ellipseMode(CENTER);
    ellipse(xPos + bodyWidth + eyeWidth/2 + eyeXpos, yPos - neckLength + legBit + eyeHeight/2 + eyeYpos, eyeWidth, eyeHeight); //eye white
    fill(colours[floor(random(0, colours.length))]);
    ellipse(xPos + bodyWidth + eyeWidth/2 + eyeXpos + eyeWidth*0.1, yPos - neckLength + legBit + eyeHeight/2 + eyeYpos, irisWidth, irisHeight);
    fill(0);
    ellipse(xPos + bodyWidth + eyeWidth/2 + eyeXpos + eyeWidth*0.1, yPos - neckLength + legBit + eyeHeight/2 + eyeYpos, pupilWidth, pupilHeight); // pupil
    pop();

    var syllabelNum = floor(random(1, 5));

    creatureName = startList[floor(random(0, startList.length))];
    for (var i = 0; i < syllabelNum; ++i){
      creatureName = creatureName + midList[floor(random(0, midList.length))];
      creatureName = creatureName + endList[floor(random(0, endList.length))];
    }


    // var num_owls = Math.floor(focusedRandom(5, 11, 3, 7));
    // var spacing = 400 / num_owls;
    // for (i=0; i<num_owls; i++) {
    //   var xpos = 35 + spacing * i;
    //   var gray = int(focusedRandom(0, 102, 3))
    //   var scalar = focusedRandom(0.15, 0.75, 2);
    //   this.owl(xpos, 220-2*this.temperatures[i][1], gray, scalar);
    // }
    //var message = "" + num_owls + " day weather owl forecast.";


    var message = "Dinomon of the Day: " + creatureName;
    return message;
  }
}






































