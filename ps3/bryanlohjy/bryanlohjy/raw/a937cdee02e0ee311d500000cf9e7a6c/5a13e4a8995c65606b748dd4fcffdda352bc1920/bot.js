// Specifying Closed Bot Image Paths
var closed_will = [
  "will4.png",
]

// Array of tumblr blogs with transparent pngs
var blogs = [
  "transparenc-e.tumblr.com",
  "kanyeheads.tumblr.com",
  "freefilehunt.tumblr.com",
  "transparentoverlaystuff.tumblr.com",
  "transparenzz.tumblr.com",
  "cute-minds.tumblr.com",
  "pngtrash.tumblr.com",
  "transparent-noms.tumblr.com",
  "transparentthingss.tumblr.com",
  "tales-of-transparent.tumblr.com",
  "transparent--blog.tumblr.com",
  "glitterxspite.tumblr.com",
  "the-forgotten-rose.tumblr.com",
  "cutoutlife.tumblr.com",
  "trueoverlays.tumblr.com",
  "chipsprites.tumblr.com",
  "transsparentt.tumblr.com",
  "transparent-gravity-falls-gifs.tumblr.com",
  "transparentcreation.tumblr.com",
  "png-transparent.tumblr.com",
  "transparants.tumblr.com",
  "anime-png.tumblr.com",
  "glitterblunt.tumblr.com",
  "transparent-flowers.tumblr.com",
  "trans-par-en-cy.tumblr.com"
]

// Declaring global array for pngs to be rendered
var greenPngs = [];

// Selecting a random blog from the list of blogs
var blog = blogs[Math.floor(Math.random() * blogs.length)];

// Constructing Tumblr API url
var tumblrKey= "MFcFv8Ri30f7NRJr2TH8YLrDU019fca1NXil1epaapzikoX0tz";
var tumblrURL="http://api.tumblr.com/v2/blog/"+blog+"/posts/photo?api_key="+tumblrKey;

// Polka Dots
var circ1;
var circ2;
var circ3;
var circ4;

// Overall scaling of pngs
var pngScale= 5.6;



// Defining colors --------------------------------------------------------------------------
// background
var bg1 = [255,255,235];

// Polka Dot alpha
var fgAlpha = 180;
// Polka Dot colours
var fg1 = [191, 23, 101,fgAlpha];
var fg2 = [63, 56, 89,fgAlpha];
var fg3 = [128, 166, 130,fgAlpha];
var fg4 = [242, 222, 119,fgAlpha];

function setup() {
}

function bot() {
  // make this true once image has been drawn
  this.have_drawn = false;
  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }
  // Loading External Images + Data -----------------------------------------------------------
  this.preload = function() {
    // Declaring amount of PNGs to be source (20 is the max returned by the Tumblr API)
    var amtOfPNGs=20;
    // requesting posts from Tumblr API
    $.ajax({
        crossDomain: true,
        url: tumblrURL,
        dataType: 'jsonp',
        async: false,
        type: 'GET',
        success: function(results){
            // console.log(blog);
            for (i = 0; i < amtOfPNGs; i++) { 
              // path to image urls
              img = results.response.posts[i].photos["0"].alt_sizes["2"].url;
              // only create image object and push to array if the image is a PNG of GIF - more likely to be a transparent cutout
              if (img.endsWith(".png") || img.endsWith(".gif")){
                img = loadImage(results.response.posts[i].photos["0"].alt_sizes["0"].url);
                greenPngs.push(img);
              }
            }

          // Will Smith ------------------------------------------------------------------
          // Loading local image of Will Smith's face as an image object
          imgWill = loadImage(closed_will[0]);
          // Defining how many layers from the top for Will Smith's face to be rendered
          willLayer = 8;
          //Splicing Will Smith's face into the array of images to be rendered
          greenPngs.splice(3, 0, imgWill); 
        },
       
    });

 }


  this.setup = function() {

  }

  this.respond = function() {
    // drawing Background -------------------------------------------------
    background(bg1);
    // Polka Dots
    // Defining polka dots
    var circ1 = {
        x:random(0,width),
        y:random(0,height),
        rad:random(100,180),
        color:fg1
    };
    var circ2 = {
        x:random(0,width),
        y:random(0,height),
        rad:random(100,300),
        color:fg2
    };
    var circ3 = {
        x:random(0,width),
        y:random(0,height),
        rad:random(100,250),
        color:fg3
    };
    var circ4 = {
        x:random(0,width),
        y:random(0,height),
        rad:random(100,400),
        color:fg4
    };

    // Drawing polka dots
    push();
    noStroke();
    fill(circ1.color);
    ellipse(circ1.x,circ1.y,circ1.rad,circ1.rad);

    fill(circ2.color);
    ellipse(circ2.x,circ2.y,circ2.rad,circ2.rad);

    fill(circ3.color);
    ellipse(circ3.x,circ3.y,circ3.rad,circ3.rad);

    fill(circ4.color);
    ellipse(circ4.x,circ4.y,circ4.rad,circ4.rad);
    pop();

    // Drawing PNGS ------------------------------------------
    // Drawing all images in the array
    for (i = 0; i < greenPngs.length; i++) { 
      // Code to resize images to be to the a rough appropriate size
      // check png size - is its width greater than roughly amount of pngs, then resize to ratio. Otherwise, render at normal width
      if (greenPngs[i].width>width/greenPngs.length){
        resizeRatio= (width/greenPngs.length)/greenPngs[i].width;
        image(greenPngs[i],random(0,width-100),random(0,height/2),greenPngs[i].width*resizeRatio*pngScale, greenPngs[i].height*resizeRatio*pngScale);
      }
    }

    // Message ------------------------------------------------
    var linkedBlog = blog.link("http://"+blog);
    var message = "#whereswill \nImages: " + linkedBlog;
    return message;
  }
}
