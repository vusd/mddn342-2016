// images for the background
var closed_images = [
"100","130","140","150","160","170","270","271","171","172","173","306","174","175","176","177","178","70","221","223","619","190","224","10","20","30","40","50","215","598","610","191","192","611","612","613","212","214","60","225","80","193","194","90","100","110","120","121","122","123","125","124","201","202","126","274","275","307","272","273","288","289","290","204","205","201","202","203","204","205","206","207","208","209","210","211","620","628","629","630","631","602","310","311","597","298","299","617","234","300","301","302","303","304","305","291","292","293","294","295","296","297","286","287","596","308","309","599","600","601","632","633","634","635","614","615","616","624","625","626","618","268","260","264","265","266","261","262","258","283","256","263","267","259","284","285","253","254","255","235","236","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","237","623","627","621","622","608","603","604","605","606","282","279","280","233","226","227","228","229","230","232","281","277","278"
]
var imageData;
var img;
var img2;


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
    var image_name2 = random(closed_images);
    println(image_name);
    println(image_name2);

    var url = "/data.json";
    

    // load the image the variable img
    //this.img = loadImage("124.jpg");
    //this.img2 = loadImage(image_name2);
  }

  
  var trafficImg;
  var jsonData = loadJSON("data.json");
  this.setup = function() {
    this.trafficImg = createImg("http://www.trafficnz.info/camera/"+random(closed_images)+".jpg");

    
  }

  this.grammar = {

    "sentence": ["The #line# is as #metaphor_1# as a #metaphor_2# of #metaphor_3#","I am #metaphor_1#, I am a #metaphor_2#","There is such #large# #action#"],
    "line": ["road","highway","long piece of dirt","endless horizon","scar on the earth","path","road to Rome"],
    "metaphor_1": ["clear","empty","void","desolate","quiet","friendless","forsaken","abandoned","deserted","forgotten","vacant","godforsaken","neglected"],
    "metaphor_2": ["heart","ship","vessel","coffin","rotten box","gathering","company","hoard","pack","many years","band","society"],
    "metaphor_3": ["lead","stone","sorrow","solitude","pain","wretchedness","lost souls","nothing","despair"],
    "country": ["Albania's unemployment of 19.3% ","Algeria's unemployment of 11.2% ","Antigua and Barbuda's unemployment of 11% ","Armenia's unemployment of 18.5% ","Australia's unemployment of 5.8% ","Austria's unemployment of 9.1% ","Azerbaijan's unemployment of 5.3% ","Bahrain's unemployment of 4.1% ","Bangladesh's unemployment of 4.9% ","Barbados's unemployment of 11.9% ","Belarus's unemployment of 0.7% ","Belgium's unemployment of 8.5% ","Belize's unemployment of 12.9% ","Bhutan's unemployment of 3.2% ","Bolivia's unemployment of 7.4% ","Bosnia and Herzegovina's unemployment of 35% ","Botswana's unemployment of 17.8% ","Brazil's unemployment of 10.9% ","Brunei's unemployment of 2.7% ","Bulgaria's unemployment of 9.9% ","Cambodia's unemployment of 0.5% ","Cameroon's unemployment of 4.4% ","Canada's unemployment of 6.9% ","Cape Verde's unemployment of 15.8% ","Central African Republic's unemployment of 8% ","Chad's unemployment of 22.6% ","Chile's unemployment of 5.9% ","Colombia's unemployment of 8.9% ","Comoros's unemployment of 20% ","Costa Rica's unemployment of 9.7% ","Croatia's unemployment of 18.2% ","Cuba's unemployment of 3.3% ","Czech Republic's unemployment of 5.2% ","Denmark's unemployment of 5.8% ","Djibouti's unemployment of 60% ","Dominica's unemployment of 23% ","Dominican Republic's unemployment of 14.4% ","East Timor's unemployment of 20% ","Ecuador's unemployment of 4.8% ","Egypt's unemployment of 8.1% ","El Salvador's unemployment of 6.1% ","Equatorial Guinea's unemployment of 22.3% ","Estonia's unemployment of 6.3% ","Fiji's unemployment of 8.6% ","Finland's unemployment of 9.1% ","Gabon's unemployment of 21% ","Germany's unemployment of 4.5% ","Ghana's unemployment of 3.6% ","Greece's unemployment of 24.1% ","Grenada's unemployment of 24.5% ","Guatemala's unemployment of 4.1% ","Guyana's unemployment of 9% ","Honduras's unemployment of 4.3% ","Hungary's unemployment of 6% ","Iceland's unemployment of 3.2% ","India's unemployment of 3.6% ","Indonesia's unemployment of 5.7% ","Iran's unemployment of 11.212% ","Iraq's unemployment of 16% ","Ireland's unemployment of 7.8% ","Israel's unemployment of 4.7% ","Italy's unemployment of 11.4% ","Jamaica's unemployment of 14% ","Japan's unemployment of 3.2% ","Jordan's unemployment of 11.1% ","Kazakhstan's unemployment of 6.1% ","Kenya's unemployment of 42% ","Kiribati's unemployment of 38.2% ","Kuwait's unemployment of 3% ","Kyrgyzstan's unemployment of 8% ","Laos's unemployment of 1.4% ","Latvia's unemployment of 9.8% ","Lebanon's unemployment of 10% ","Lesotho's unemployment of 42.7% ","Libya's unemployment of 13% ","Lithuania's unemployment of 9.2% ","Luxembourg's unemployment of 6.5% ","Macedonia's unemployment of 24% ","Malaysia's unemployment of 3.1% ","Mali's unemployment of 30% ","Marshall Islands's unemployment of 36% ","Mauritania's unemployment of 31% ","Mauritius's unemployment of 7.9% ","Mexico's unemployment of 4.9% ","Mongolia's unemployment of 7.7% ","Montenegro's unemployment of 18.3% ","Mozambique's unemployment of 60% ","Namibia's unemployment of 28.1% ","Netherlands's unemployment of 6.4% ","New Zealand's unemployment of 5.3% ","Nicaragua's unemployment of 6% ","Nigeria's unemployment of 6.4% ","Norway's unemployment of 4.6% ","Pakistan's unemployment of 8.5% ","Palau's unemployment of 4.2% ","Panama's unemployment of 5.6% ","Papua New Guinea's unemployment of 1.9% ","Paraguay's unemployment of 5.5% ","Peru's unemployment of 6.1% ","Philippines's unemployment of 5.6% ","Poland's unemployment of 9.5% ","Portugal's unemployment of 12.4% ","Romania's unemployment of 6.4% ","Saint Kitts and Nevis's unemployment of 5.1% ","Saint Lucia's unemployment of 15.7% ","Saint Vincent and the Grenadines's unemployment of 18% ","Saudi Arabia's unemployment of 11.5% ","Senegal's unemployment of 48% ","Singapore's unemployment of 1.9% ","Slovakia's unemployment of 9.9% ","Slovenia's unemployment of 12.6% ","South Africa's unemployment of 26.7% ","Spain's unemployment of 19.6% ","Sri Lanka's unemployment of 4.2% ","Sudan's unemployment of 13.6% ","Suriname's unemployment of 8.9% ","Swaziland's unemployment of 40.6% ","Sweden's unemployment of 7.7% ","Tajikistan's unemployment of 2.4% ","Thailand's unemployment of 0.9% ","Tonga's unemployment of 1.1% ","Trinidad and Tobago's unemployment of 3.7% ","Tunisia's unemployment of 15.2% ","Turkey's unemployment of 11.1% ","Turkmenistan's unemployment of 3.5% ","United Arab Emirates's unemployment of 4.3% ","United Kingdom's unemployment of 4.9% ","Uruguay's unemployment of 7.7% ","Uzbekistan's unemployment of 8% ","Vanuatu's unemployment of 4.6% ","Venezuela's unemployment of 6.7% ","Vietnam's unemployment of 3.4% ","Yemen's unemployment of 35% ","Zambia's unemployment of 15% ","Zimbabwe's unemployment of 80% ","United States's unemployment of 4.9% ","nowhere"],
    "large":["broad","considerable","enormous","extensive","full","generous","giant","gigantic","grand","hefty","great","huge","immense","massive","sizable","spacious","substantial","vast","wide","gross","liberal","sweeping","colossal","copious","excessive","extravagent"],
    "action":["bias","inequality","discrimination","disparity","injustice","asperity","partisanship","gentrification","unhappiness","sadness","crime","atrocity","corruption","evil","lawlessness","scandal","delinquency","depravity","immorality","villainy","wickedness","hunger","starvation"]
  }

//this is just here as an example of the work I did getting image processing working
this.placeHolder = function(){
  //   var counter = 0;

  //   var redSum_1 =0;
  //   var greenSum_1 =0;
  //   var blueSum_1 = 0;

  //   var redSum_2 =0;
  //   var greenSum_2 =0;
  //   var blueSum_2 = 0;

  //   var averageRed_1 = 0;
  //   var averageRed_2 = 0;

  //   var averageGreen_1 = 0;
  //   var averageGreen_2 = 0;

  //   var averageBlue_1 = 0;
  //   var averageBlue_2 = 0;

  //   var averageBrightness_1 = 0;
  //   var averageBrightness_2 = 0;



  //   var tilePercentage = 0.1;
  //   /*
  //   this is an array of the average values of each channel (R,G and B in that order) in a tile.
  //   the tilesize is based on the tilePercentage value above, 0.2 means each block is 20% of the
  //   width and height, so there would be 25 tiles, and there for 75 entries in the array
  //   */
  //   var tiles;


  //   this.organize = function(){


  //    averageRed_1 = normaliseAreaChannel(firstimg,0,0,0,440,220);
  //    averageRed_2 = normaliseAreaChannel(secondimg,0,0,0,440,220);

  //    averageGreen_1 = normaliseAreaChannel(firstimg,1,0,0,440,220)
  //    averageGreen_2 = normaliseAreaChannel(secondimg,1,0,0,440,220)

  //    averageBlue_1 = normaliseAreaChannel(firstimg,2,0,0,440,220)
  //    averageBlue_2 = normaliseAreaChannel(secondimg,2,0,0,440,220)

  //    averageBrightness_1 = average((averageRed_1+averageGreen_1+averageBlue_1),3);
  //    averageBrightness_2 = average((averageRed_2+averageGreen_2+averageBlue_2),3);






  //  }

  //  function average(sum, count){
  //   var ave = sum/count;
    
  //   return ave;
  // }

  // var switch1=true;
  // this.createTiles = function(){
  //   tiles = new Array();
  //   for(var y=0; y<height;y+=height*tilePercentage){
  //     line(0,y,width,y);
  //     for(var i=0;i<width;i+=width*tilePercentage){
  //       tiles.push(normaliseAreaChannel(firstimg,0,0,0,width,height));
  //       tiles.push(normaliseAreaChannel(firstimg,1,0,0,width,height));
  //       tiles.push(normaliseAreaChannel(firstimg,2,0,0,width,height));
  //       line(i,0,i,height);
        


  //     }
  //   }  

  //   if(switch1){
  //     println(tiles);
  //     switch1=false;
  //   }
  // }


  // //use this function to return the average intensity of a channel normalised to between 0-1
  // function normaliseAreaChannel(img, channel, xStart, yStart, xEnd, yEnd){

  //   var sum =0;

  //   var totalPixels = (xEnd-xStart)*(yEnd-yStart);


  //   for(var y = yStart; y< yEnd; y++){
  //     for(var x = xStart; x< xEnd; x++){
  //       sum = sum+img[(y*x*4)+channel];

  //     }
  //   }


  //   //println(sum);
  //   var averageTotal = map(average(sum,totalPixels),0,totalPixels/255,0,1);
    
  //   //println(averageTotal);
  //   return averageTotal;

  // }


  // var firstimg;




  // this.invert = function(){
  //   var d = pixelDensity();
  //   var fullImage = 4 * (width*d)*(height*d);
  //   for(var i=0;i<fullImage;i+=4){
  //     //if(pixels[i]>150&&pixels[i+1]>150&&pixels[i+2]>150){

  //       pixels[i]=255-pixels[i];
  //       pixels[i+1]=255-pixels[i+1];
  //       pixels[i+2]=255-pixels[i+2];
  //       //counter++;
  //     //}
      
  //   }
  // }

  // this.setWhite = function(){
  //   var d = pixelDensity();
  //   var fullImage = 4 * (width*d)*(height*d);
  //   for(var i=0;i<fullImage;i+=4){
  //     //if(pixels[i]>150&&pixels[i+1]>150&&pixels[i+2]>150){

  //       pixels[i]=255;
  //       pixels[i+1]=255;
  //       pixels[i+2]=255;
  //       //counter++;
  //     //}
      
  //   }
  // }
}

this.loadImgs = function(){
  image(this.trafficImg, 0,-16,440,280);
  
  //below here is what was used for image analysis
  // loadPixels();
  // firstimg = pixels;
  // updatePixels();

  // //image(this.trafficImg, 0, -16);  
  // image(this.img2, 0, -16);
  // loadPixels();
  // secondimg = pixels;
  // updatePixels();
}

this.grammar2;

this.respond = function() {
  this.loadImgs();
  //this.createTiles();
  //this.organize();
  //println();
  // set have_drawn to true since we have completed
  this.have_drawn = true;
  
  // construct the message
  var grammar = tracery.createGrammar(this.grammar);
  var seed = "#sentence#";
  var message = grammar.flatten(seed);
  return message;
}
}