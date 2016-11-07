 // images for the background
var closed_images = [
  "o1.jpg",
  "o2.jpg",
  "o3.jpg",
  "o4.jpg"
];

var headlines = [];

var hits_pb = [
   [1, 3, 5, 10, 4, 2]	,
   [0, 3, 10, 15, 4, 1],
   [9, 5, 12, 20, 3, 7]
]
var tags = [
  ["US","President","Obama","Congress"]	
];

function bot() {
	
  //News API
  this.news = "https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=189d4d547e5343cc8506083c036318f0" ; 
  // make this true once image has been drawn
  this.have_drawn = false;
  

  // helper function to draw an owl
  this.hawk = function(x, y, c, c2, s) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    stroke(c2); // Set the gray value
    strokeWeight(70);
    line(0, -35, 0, -40); // Body
    noStroke();
    fill(c);
    rect(-17.5, -65, 35, 35); // Left eye dome
    rect(17.5, -65, 35, 35);  // Right eye dome
    arc(0, -65, 70, 70, 0, PI);  // Chin
    fill(c2);
    ellipse(-14, -65, 8, 8);  // Left eye
    ellipse(14, -65, 8, 8);   // Right eye
    quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
	quad(0, -58, 4, -51, 0, -44, -4, -60);//wing
    pop();
  }

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    var image_name = random(closed_images);
   // println(image_name);

    this.img = loadImage(image_name);
	
	this.articles = loadJSON(this.news);
	    this.hits;
	this.tag = tags;
    var articles = this.articles;
	var word = "USA"; var word1 = "PRESIDENT"; var word2 = "OBAMA"; var word3 = "ELECT";
	//this.count = []; this.count1 = []; this.count2 = []; this.count3 = [];
	this.count; this.count1; this.count2; this.count3;
	for (var i= 0; i<articles.length; i++){
		
		var title = articles[i]["titles"];
		var description = articles[i]["description"];
		var img_art = articles[i]["urlToImage"];
				
		if (articles[i] === "U"){
			for (var j = i; j < (word.length + j); j++){
				//this.articles.push(count[j]);
				this.count+=1;
			}
		}
		if (articles[i] === "P"){
			for (var k = i; k < (word1.length + j); j++){
				//this.articles.push(count1[k]);
				this.count1+=1;
			}
		}
		if (articles[i] === "O"){
			for (var l = i; l < (word2.length + j); j++){
				//this.articles.push(count2[l]);
				this.count2+=1;
				console.log(word2);
			}
		}
		if (articles[i] === "E"){
			for (var m = i; m < (word3.length + j); j++){
				//this.articles.push(count3[m]);
				this.count3+=1;
			}
		}

	}
	  
	var data = [
	[title, description]
	];
	headlines.push(data);
	
	
}

  this.setup = function() {

}
//at the moment using tracery, will use headlines instead
  this.grammar = {
    "animal": ["Sparrow","Hawk","Night-Watcher"],
    "reaction": ["Smiling","Perplexed","Excited","Wistful","Enigmatic"],
    "timeunit": ["Day", "Night", "Midday"],
	"person": ["Obama"]
  }
  

  this.respond = function() {
	 
    // draw the background image
    image(this.img, 0, 0, width, height);

    // choose how many hawks to draw
    var num_hawks = Math.floor(focusedRandom(5, 11, 3, 7));
    this.hits = [this.count, this.count1, this.count2, this.count3];
	
    var random_hits = this.hits;
    // draw the hawks based on the data of number of hits and num_hawks
    var spacing = 400 / num_hawks;
	
    for (i=0; i<num_hawks; i++) {
		for (var g = 0; g < random_hits.length; g++ )
      var xpos = 20 + spacing *random_hits[g];
      var col = color(255, 214, 29);
	  var col2 = color(120, 60, 4);
      var scalar = focusedRandom(0.15, 0.75, 2);
      this.hawk(xpos, 220 - 2 * random_hits[g], col, col2, scalar);
	 
	}
	//console.log(this.random_hits);
    //console.log(this.count); console.log(this.count1); console.log(this.count2); console.log(this.count3); 
    this.have_drawn = true;

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var sentence = " #timeunit# #reaction# #animal.s# #person#";
    var message = grammar.flatten(sentence) + "Powered by News API (USA Today Edition)";
	var words = random_hits;
    return words;
  }
}