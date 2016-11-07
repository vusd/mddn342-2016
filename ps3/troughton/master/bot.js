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

var overlayFragmentShader = 'precision mediump float;   \n ' +
'varying vec2 textureCoord; \n' +
'uniform float overlayIntensity; \n' +
'uniform sampler2D textureSampler; \n' +
'void main(void) {   \n' +
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
                 red(fromColour)/255.0, green(fromColour)/255.0, blue(fromColour)/255.0, 1.0);
    
    
    gl.uniform4f(shaderProgram.toColour,
                 red(toColour)/255.0, green(toColour)/255.0, blue(toColour)/255.0, 1.0);
    
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
    
    this.parameters;
    
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
    
    this.setup = function() {
        
        /*
         for(i=0;i<10;i++) {
         this.temperatures.push([40, 40]);
         }
         */
        
        perspective(50 / 180 * PI, width/height, 1.0, 10000.0); //50 degree vertical FOV, near plane at 1, far plane at 10000
        
        var data = this.weatherData;
        
        p5.RendererGL.prototype.addShader('gradientVert', gradientVertexShader);
        p5.RendererGL.prototype.addShader('gradientFrag', gradientFragmentShader);
        
        p5.RendererGL.prototype.addShader('overlayVert', overlayVertexShader);
        p5.RendererGL.prototype.addShader('overlayFrag', overlayFragmentShader);
        
        this.parameters = this.generateScheme(this.weatherData);
    }
    
    this.generateScheme = function(weatherData) {
        
        //Sky colour should lerp between clear/cloudy/stormy/sunset/night
        //We show leaves and grass if it's not too cold
        //The tree goes from more brown to greyish as the temperature gets colder and as it goes to night.
        //The grass/leaves are more yellow if it's dry/hot
        //The leaves turn orange/red if it's autumn.
        
        var currentSeason = function(month, latitude) {
            if (latitude < 0) {
                month = (month + 6) % 12;
            }
            if (3 <= month <= 5) {
                return 'spring';
            } else if (month <= 8) {
                return 'summer';
            } else if (month <= 11) {
                return 'autumn';
            } else {
                return 'winter';
            }
        }
        
        var date = new Date();
        
        var latitude = weatherData.city.coord.lat;
        var season = currentSeason(date.getMonth(), latitude);
        
        var currentWeatherData = weatherData.list[0];
        
        var tempCelsius = currentWeatherData.main.temp - 273.15;
        var currentHour = date.getHours();
        currentHour += date.getMinutes() / 60.0;
        
        var remappedHumidity = map(currentWeatherData.main.humidity, 40, 70, 0.0, 1.0);
        var rainVolume = 0.0; 
        if (currentWeatherData.rain != null) {
            rainVolume = currentWeatherData.rain['3h'];
        }
        
        var isSnowing = currentWeatherData.snow != null;
        
        var text = weatherData.city.name + '. ';
        
        if (tempCelsius > 28) {
            text += 'It\'s a blisteringly hot day. '
        } else if (tempCelsius > 20) {
            text += 'It\'s a hot day. ';
        } else if (tempCelsius > 16) {
            text += 'It\'s a warm day. ';
        } else if (tempCelsius > 8) {
            text += 'It\'s on the colder side of comfortable. ';
        } else if (tempCelsius > 0) {
            text += 'It\'s a cold day. ';
        } else {
            text += 'It\'s a freezing cold day. '
        }
        
        if (rainVolume > 8.0) {
            text += 'A torrential downpour soaks the land. ';
        } else if (rainVolume > 4.0) {
            text += 'Rain is pouring down ';
            if (season == 'autumn') {
                text += 'through the reddening leaves. ';
            } else if (season == 'winter') {
                text += 'through the tree\'s bare branches. ';
            } else {
                text += 'through lush leaves. ';
            }
        } else if (rainVolume > 0.2) {
            text += 'Rain falls in light showers. ';
        }
        
        if (remappedHumidity == 0.0) {
            text += 'The air is dry and arid. ';
        } else if (remappedHumidity == 1.0) {
            text += 'The air is damp and humid. ';
        }
        
        if (isSnowing) {
            text += 'Snow carpets the ground. ';
        }
        
        var skyColours = {};
        skyColours.cloudy = [color(214.0, 234.0, 243.0), color(85.0, 93.0, 104.0)];
        skyColours.snowy = [color(212.0, 225.0, 231.0), color(164.0, 190.0, 206.0)];
        skyColours.dusk = [color(235.0, 123.0, 110.0), color(231.0, 181.0, 143.0)];
        skyColours.night = [color(42, 64, 110), color(2, 4, 32)];
        skyColours.clearAfternoon = [color(49.0, 132.0, 226.0), color(183.0, 218.0, 242.0)];
        skyColours.clearDay = [color(145, 182, 249), color(254, 255, 244)];
        
        var chosenSkyColour;
        
        //I tried to think of a way to do what's below without a bunch of messy branching if statements. As you can see, I failed horribly.
        
        var skyProgressHour = (currentHour + 22) % 24; //move 2pm to be midday.
         if (skyProgressHour > 12.0) {
                skyProgressHour = 12 - Math.abs(12.0 - skyProgressHour); //pretend that the day is symmetric around 2pm – not a terrible assumption.
            }
        
        if (isSnowing) {
            chosenSkyColour = lerpColor(color(0, 0, 0), skyColours.snowy, (skyProgressHour - 5) / 4.0);
        } else {
            if (skyProgressHour <= 5.0) {
                chosenSkyColour = skyColours.night;
            } else if (skyProgressHour <= 6.0) {
                //Range is 5...6
                var percentage = (skyProgressHour - 5);
                chosenSkyColour = [lerpColor(skyColours.night[0], skyColours.dusk[0], percentage), lerpColor(skyColours.night[1], skyColours.dusk[1], percentage)];
            } else if (skyProgressHour <= 10.0) {
                var percentage = (skyProgressHour - 7.0);
                chosenSkyColour = [lerpColor(skyColours.dusk[0], skyColours.clearAfternoon[0], percentage), lerpColor(skyColours.dusk[1], skyColours.clearAfternoon[1], percentage)];
            } else {
                var percentage = (skyProgressHour - 10.0)/2.0;
                chosenSkyColour = [lerpColor(skyColours.clearAfternoon[0], skyColours.clearDay[0], percentage), lerpColor(skyColours.clearAfternoon[1], skyColours.clearDay[1], percentage)];
            }
            
            var cloudiness = 0.0;
            if (currentWeatherData.clouds != null) {
                cloudiness = currentWeatherData.clouds.all / 100.0;
            }
            
            chosenSkyColour = [lerpColor(chosenSkyColour[0], skyColours.cloudy[0], cloudiness), lerpColor(chosenSkyColour[1], skyColours.cloudy[1], cloudiness)];
            
        }
        
        var result = { };
        
        result.skyFromColour = chosenSkyColour[0];
        result.skyToColour = chosenSkyColour[1];
        result.showLeaves = season != 'winter';
        result.showGrass = !isSnowing;
        result.treeColour = isSnowing ? color(128, 120, 112) : color(96, 89, 57);
        result.leafColour = season == 'autumn' ? color(225, 229, 136) : color(79, 156, 26);
        result.grassColour = lerpColor(color(128, 255, 128), color(51, 157, 72), remappedHumidity); //If it's dry, the grass should be dry; vice versa for if it's humid.
        result.groundColour = lerpColor(color(128, 255, 128), color(6, 60, 14), remappedHumidity);
        result.rainIntensity = rainVolume / 12.0; //Try to map it to a semi-sensible range – rainVolume == 12.0 would mean very heavy rain.
        result.text = text;
        
        return result;
        
    }
    
    this.drawLandscape = function() {
        
        push();
        scale(630.0); //We can't rely on normalising the models as we need to retain the relative scales from the original scene.
        
        
        camera(0.578, -12.879, 11.159); //Move the camera to the right position.
        
        texture(this.emptyTexture); //prevent errors about there being no texture bound.
        
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
    
    this.numRenders = 0;
    
    this.isDone = function() {
        return this.numRenders >= 3;
    }
    
    
    this.respond = function() {
        
        background(43, 123, 225);
        backgroundGradient(this.parameters.skyFromColour, this.parameters.skyToColour);
        
        var lightColour = lerpColor(this.parameters.skyFromColour, this.parameters.skyToColour, 0.5);
        
        directionalLight(lightColour, 0.0, 1.0, -0.25);
        ambientLight(10, 10, 10);
        
        if (this.parameters.rainIntensity > 0.0) {    
            overlayImage(this.rainTexture, this.parameters.rainIntensity);
        }
        
        this.drawLandscape();
        
        this.numRenders += 1;
        if (this.numRenders >= 3) {
            noLoop(); //Ideally, we'd stop after one render, but that sometimes ends up with weird graphical issues, so we start after a few.
        }
        
        return this.parameters.text;
    }
}
