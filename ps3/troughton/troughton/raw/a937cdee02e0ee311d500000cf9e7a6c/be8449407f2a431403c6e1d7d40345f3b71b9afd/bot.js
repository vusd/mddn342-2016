var gradientVertexShader =  'attribute vec3 aPosition;' +
'attribute vec2 aTexCoord;'  +
'uniform vec4 fromColour;' +
'uniform vec4 toColour;' +
'varying vec4 outputColour;' +
'void main(void){    ' +
'    vec4 positionVec4 = vec4(aPosition, 1.0);' +
'    gl_Position = positionVec4;      ' +
'    outputColour = mix(toColour, fromColour, aTexCoord.y);' +
'}';

var gradientFragmentShader = 'precision mediump float;    ' +
'varying vec4 outputColour;  ' +
'void main(void) {   ' +
'    gl_FragColor = outputColour;' +
'}';

var overlayVertexShader = 'attribute vec3 aPosition;' +
'attribute vec2 aTexCoord;'  +
'varying vec2 textureCoord;' +
'void main(void){    ' +
'    vec4 positionVec4 = vec4(aPosition, 1.0);' +
'    gl_Position = positionVec4;      ' +
'    textureCoord = aTexCoord;' +
'}';

var overlayFragmentShader = 'precision mediump float;    ' +
'varying vec2 textureCoord;' +
'uniform float overlayIntensity;'
'uniform sampler2D textureSampler;' +
'void main(void) {   ' +
'    gl_FragColor = texture2D(textureSampler, textureCoord) * overlayIntensity;\n' +
'}';


p5.prototype.backgroundGradient = function(fromColour, toColour) {
  var gl = this._renderer.GL;
  var shaderProgram =
    this._renderer._getShader('gradientVert', 'gradientFrag');

  gl.useProgram(shaderProgram);
  shaderProgram.fromColour = gl.getUniformLocation(
    shaderProgram, 'fromColour' );
  shaderProgram.toColour = gl.getUniformLocation(
    shaderProgram, 'toColour' );
    

  gl.uniform4f(shaderProgram.fromColour,
    fromColour[0]/255.0, fromColour[1]/255.0, fromColour[2]/255.0, 1.0);
    
    
  gl.uniform4f(shaderProgram.toColour,
    toColour[0]/255.0, toColour[1]/255.0, toColour[2]/255.0, 1.0);
    
  gl.disable(gl.DEPTH_TEST);
  
  this.plane(2, 2, 1, 1);
  
  gl.enable(gl.DEPTH_TEST);

  return this;
};

p5.prototype.overlayImage = function(image, intensity) {
    
    if (intensity == null) {
        intensity = 1.0;
    }
    
  var gl = this._renderer.GL;
  var shaderProgram =
    this._renderer._getShader('overlayVert', 'overlayFrag');

  gl.useProgram(shaderProgram);
    
    
    //Most of the below code is copy-pasted from p5's texture() function.
    //Not particularly extensible, but it works.
    
    
    var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  
  var textureData;
  //if argument is not already a texture
  //create a new one
  if(!args[0].isTexture){
    if (args[0] instanceof p5.Image) {
      textureData = args[0].canvas;
    }
    //if param is a video
    else if (typeof p5.MediaElement !== 'undefined' &&
            args[0] instanceof p5.MediaElement){
      if(!args[0].loadedmetadata) {return;}
      textureData = args[0].elt;
    }
    //used with offscreen 2d graphics renderer
    else if(args[0] instanceof p5.Graphics){
      textureData = args[0].elt;
    }
    var tex = gl.createTexture();
    args[0]._setProperty('tex', tex);
    args[0]._setProperty('isTexture', true);
    this._renderer._bind.call(this, tex, textureData);
  }
  else {
    if(args[0] instanceof p5.Graphics ||
      (typeof p5.MediaElement !== 'undefined' &&
      args[0] instanceof p5.MediaElement)){
      textureData = args[0].elt;
    }
    else if(args[0] instanceof p5.Image){
      textureData = args[0].canvas;
    }
    this._renderer._bind.call(this, args[0].tex, textureData);
  }
  
  gl.activeTexture(gl.TEXTURE0 + 1);
  gl.bindTexture(gl.TEXTURE_2D, args[0].tex);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, 'textureSampler'), 1);
   gl.uniform1f(gl.getUniformLocation(shaderProgram, 'overlayIntensity'), intensity); 
    
  gl.disable(gl.DEPTH_TEST);
  
  gl.enable(gl.BLEND);
  gl.blendEquation( gl.FUNC_ADD );
  gl.blendFunc( gl.ONE, gl.ONE );
  
  this.plane(2, 2, 1, 1);
  
  gl.disable(gl.BLEND);
  
  gl.enable(gl.DEPTH_TEST);

  return this;
};

function bot() {
    
    var schemes = {'rainyAutumn': 
            {'skyFromColour': [235.0, 123.0, 110.0],
                'skyToColour': [231.0, 181.0, 143.0],
                'showLeaves': true,
                'leafColour': [225, 229, 136],
                'showGrass': true,
                'treeColour': [86, 69, 59],
                'grassColour': [128, 255, 128],
                'groundColour': [160, 185, 90],
                'rainIntensity': 0.7
            },
            'snowy':
            {'skyFromColour': [212.0, 225.0, 231.0],
                'skyToColour': [164.0, 190.0, 206.0],
                'showLeaves': false,
                'leafColour': [255, 255, 255],
                'treeColour': [128, 120, 112],
                'showGrass': false,
                'grassColour': [128, 255, 128],
                'groundColour': [207, 221, 233],
                'rainIntensity' : 0.0
            }
    };
        
    
    this.parameters = schemes.snowy;
    
  this.url = 'http://api.openweathermap.org/data/2.5/forecast/city?id=2179538&APPID=131831b6a333129e275bae93029f31ea'
  this.weatherData;
  this.temperatures = [];
  
  this.emptyTexture;
  this.rainTexture;
  this.hillMesh;
  this.treeMesh;
  this.leavesMesh;
  this.grassMesh; 

  this.preload = function() {
    this.weatherData = loadJSON(this.url);
    
    this.emptyTexture = loadImage("empty.png");
    this.rainTexture = loadImage("RainTexture.png");
    
    
    this.hillMesh = loadModel("Hill.obj", false);
    this.treeMesh = loadModel("TreeBase.obj", false);
    this.leavesMesh = loadModel("TreeLeaves.obj", false);
    this.grassMesh = loadModel("GrassCarpet.obj", false);
  }
  
  this.preferredRenderer = function() {
      return WEBGL;
  }
  
  this.drawLandscape = function() {

push();
    scale(630.0);
  
  directionalLight(this.parameters.skyFromColour[0], this.parameters.skyFromColour[1], this.parameters.skyFromColour[2], 0.0, 1.0, -0.25);
  ambientLight(10, 10, 10);



  camera(0.578, -12.879, 11.159);

  texture(this.emptyTexture); //prevent errors about there being no texture bound

  ambientMaterial(this.parameters.groundColour);
  model(this.hillMesh);
  
  ambientMaterial(this.parameters.treeColour);
  model(this.treeMesh);
  
  if (this.parameters.showLeaves) {
      ambientMaterial(this.parameters.leafColour);
      model(this.leavesMesh);
  }
  
  if (this.parameters.showGrass) {
      
    ambientMaterial(this.parameters.grassColour);
    model(this.grassMesh);
  }
  
  pop();

  }

  this.setup = function() {
      
    /*
    for(i=0;i<10;i++) {
      this.temperatures.push([40, 40]);
    }
    */

    perspective(50 / 180 * PI, width/height, 1.0, 10000.0);
    console.log(this.weatherData);
    
    p5.RendererGL.prototype.addShader('gradientVert', gradientVertexShader);
    p5.RendererGL.prototype.addShader('gradientFrag', gradientFragmentShader);
    
    p5.RendererGL.prototype.addShader('overlayVert', overlayVertexShader);
    p5.RendererGL.prototype.addShader('overlayFrag', overlayFragmentShader);
    
  }
  
  
  this.numRenders = 0;

  this.isDone = function() {
    return this.numRenders >= 3;
  }
  

  this.respond = function() {
      
  background(43, 123, 225);
 backgroundGradient(this.parameters.skyFromColour, this.parameters.skyToColour);
 
    if (this.parameters.rainIntensity > 0.0) {    
        overlayImage(this.rainTexture, this.parameters.rainIntensity);
    }
    
    this.drawLandscape();

    this.numRenders += 1;
    if (this.numRenders >= 3) {
        noLoop();
    }
     
  return "Heavy layers of snow blanket the ground. The tree stands bare in winter's chill." //JSON.stringify(this.weatherData, null, 2);
  }
}
