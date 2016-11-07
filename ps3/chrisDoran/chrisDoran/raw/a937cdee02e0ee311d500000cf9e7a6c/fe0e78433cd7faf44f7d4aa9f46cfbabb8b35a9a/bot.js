// images for the background
var image_name;
var faithImage;
var windowsize = 150;
var framesize = 8;
var pix;

function bot() {
  // make this true once image has been drawn
  this.have_drawn = false;
  //get random image from flicker along right topic
  this.image_url = 'http://loremflickr.com/440/220/christ'

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
  }

  //creating graphics for image
  this.created = function(){
    graphics = createGraphics(faithImage.width*2, faithImage.height*2);
    graphics.image(faithImage, 0, 0, graphics.width, graphics.height);    
    pix = graphics.get(floor(random(graphics.width-150)), floor(random(graphics.height-150)), 150, 150);
    loaded = true;
  }

  this.setup = function() {
    //set image variable
    faithImage = createImg(this.image_url, this.created);
  }

  //Brands
  this.grammar = {
    "Quote": ["God says, 'Turn back to me and ask for help, and I will answer your prayers.'", "I acknowledge you, my Master, my God, with all my heart. I will honor your name for a long time", "The Lord will give you insight"],
    
    "Brand": ["Apple", "Google", "Microsoft", "Coca-Cola", "Facebook", "Toyota", "IBM", "Disney", "GE", "Samsung", "Amazon", "BMW", "Intel", "Nike", "Louis Vuitton", "Mercedes-Benz", "Walmart", "Marlboro", "Pepsi", "Visa", "L'Oreal", "Ford", "Audi", "HP", "Starbucks", "Nestle", "Fox", "Chevrolet", "Colgate", "Kellogg's", "Rolex", "Porsche", "Nissan"]
  }

  this.respond = function() {
    // draw the background image
    image(faithImage, 0, 0);
   
    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // construct the message and the brand variable
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "" + "#Quote#";
    var brandSeed = "" + "#Brand#";
    var brand = grammar.flatten(brandSeed);
    var message = grammar.flatten(seed);

    //Search the chosen message and replace religious words with brand
    if(message.search("God") >= 0){
      var result = message.replace("God", brand);
    }
    else{
      var result = message.replace("Lord", brand);
    }

    //draw Rect backgroud
    rectMode(CENTER);
    noStroke();
    fill(20, 130);
    rect(220, 110, 440, 90);
    rectMode(CORNER);

    //Draw Text Overlay
    textSize(20);
    fill(255);
    textAlign(CENTER, CENTER);      
    text(result, 0, 0,width, height);
    
    return result;
  }
}
