// images for the background
var closed_images = [
  "holy.jpg",
  "holy2.jpg",
  "holy3.jpg",
  "holy4.jpg"
]

function bot() {
  // make this true once image has been drawn
  this.have_drawn = false;

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    var image_name = random(closed_images);
    println(image_name);

    // load the image the variable img
    this.img = loadImage(image_name)
  }

  this.setup = function() {
    // chose a random set of data from the list of data
    println(this.temperatures);
  }

  this.grammar = {
    "Quote": ["God says, 'Turn back to me and ask for help, and I will answer your prayers.'", "I acknowledge you, my Master, my God, with all my heart. I will honor your name for a long time", "The Lord will give you insight"],
    
    "Brand": ["Apple", "Google", "Microsoft", "Coca-Cola", "Facebook", "Toyota", "IBM", "Disney", "GE", "Samsung", "Amazon", "BMW", "Intel", "Nike", "Louis Vuitton", "Mercedes-Benz", "Walmart", "Marlboro", "Pepsi", "Visa", "L'Oreal", "Ford", "Audi", "HP", "Starbucks", "Nestle", "Fox", "Chevrolet", "Colgate", "Kellogg's", "Rolex", "Porsche", "Nissan"]
  }

  this.respond = function() {
    // draw the background image
    image(this.img);

   
    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "" + "#Quote#";
    var brandSeed = "" + "#Brand#";
    var brand = grammar.flatten(brandSeed);
    var message = grammar.flatten(seed);
    println(seed);
    println(message.search("God"));
    if(message.search("God") >= 0){
      var result = message.replace("God", brand);
    }
    else{
      var result = message.replace("Lord", brand);
    }

   textSize(20);
   fill(255);
   textAlign(CENTER, CENTER);      
   text(result, 0, 0,width, height);
    
    return result;
  }
}
