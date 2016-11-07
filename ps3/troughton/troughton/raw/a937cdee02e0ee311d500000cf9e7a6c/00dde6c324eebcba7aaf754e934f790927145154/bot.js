var gradientVertexShader =  'attribute vec3 aPosition;' +
'attribute vec2 aTexCoord;'  +
'uniform vec4 fromColour;' +
'uniform vec4 toColour;' +
'varying vec4 outputColour;' +
'void main(void){    ' +
'    vec4 positionVec4 = vec4(aPosition, 1.0);' +
'    gl_Position = positionVec4;      ' +
'    outputColour = mix(fromColour, toColour, aTexCoord.y);' +
'}';

var gradientFragmentShader = 'precision mediump float;    ' +
'varying vec4 outputColour;  ' +
'void main(void) {   ' +
'    gl_FragColor = outputColour;' +
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
    fromColour[0], fromColour[1], fromColour[2], 1.0);
    
    
  gl.uniform4f(shaderProgram.toColour,
    toColour[0], toColour[1], toColour[2], 1.0);
    
  gl.disable(gl.DEPTH_TEST);
  
  this.plane(2, 2, 1, 1);
  
  gl.enable(gl.DEPTH_TEST);

  return this;
};

function bot() {
  this.url = 'http://api.openweathermap.org/data/2.5/forecast/city?id=2179538&APPID=131831b6a333129e275bae93029f31ea'
  this.weatherData;
  this.temperatures = [];
  
  this.emptyTexture;
  this.hillMesh;
  this.treeMesh;
  this.leavesMesh;

  this.preload = function() {
    this.weatherData = loadJSON(this.url);
    
    this.emptyTexture = loadImage("empty.png");
    
    this.hillMesh = loadModel("Hill.obj", false);
    this.treeMesh = loadModel("TreeBase.obj", false);
    this.leavesMesh = loadModel("TreeLeaves.obj", false);
  }
  
  this.preferredRenderer = function() {
      return WEBGL;
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
    
//     noLoop();
  }

  this.isDone = function() {
    return true;
  }

  this.respond = function() {
      
  background(43, 123, 225);
 backgroundGradient([0.0, 0.0, 0.0], [1.0, 1.0, 1.0]);

    noStroke();
//   scale(1000);
    scale(630.0);
  
  directionalLight(250, 126, 110, 0.0, 1.0, -0.25);
//   ambientLight(10, 10, 10);



  camera(0.578, -12.879, 11.159);

  texture(this.emptyTexture); //prevent errors about there being no texture bound


  ambientMaterial(160, 185, 90);
  model(this.hillMesh);
  
  ambientMaterial(86, 69, 59);
  model(this.treeMesh);
  
  ambientMaterial(68, 154, 1);
  model(this.leavesMesh);
    
  return JSON.stringify(this.weatherData, null, 2);
  }
}
