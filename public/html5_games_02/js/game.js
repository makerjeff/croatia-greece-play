/**
 * Created by jeffersonwu on 8/14/16.
 */

/* ########## POLYFILLS ########## */

// =======================================
// REQUEST ANIMATION FRAME POLYFILL ======
// =======================================

(function(){
    var lastTime = 0;
    var vendors = ['ms','moz', 'webkit', '0'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    //if window.requestAnimationFrame doesn't exist...
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element){
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0,16-(currTime - lastTime));
            var id = window.setTimeout(function(){
                callback(currTime + timeToCall);
            },timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    //if window.cancelAnimationFrame doesn't exist...
    if(!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id){
            clearTimeout(id);
        };
    }
}());



/* ########## SETUP OBJECTS ########## */

// ==================================
// CREATE GAME OBJECT ===============
// ==================================

var game = {
    /**
     * Start initializing objects, preload assets, and display start screen.
     */
    init: function(){
        //initialize objects
        levels.init();  //initialize level methods
        loader.init();  //initialize loader

        $('.gamelayer').hide();     //hide all game layers
        $('#gamestartscreen').show();   //display start screen

        game.canvas = $('#gamecanvas')[0];  //get handler for canvas
        game.context = game.canvas.getContext('2d');    //get handler for context
    },
    showLevelScreen: function(){
        $('.gamelayer').hide(250);
        $('#levelselectscreen').show(250);
    },

    // GAME MODE
    mode: 'intro',
    slingshotX: 140,    // X coordinate of slingshot
    slingshotY: 280,    //Y coordinate of slingshot

    start: function(){
        $('.gamelayer').hide();     //hide game layers
        $('#gamecanvas').show();    //show game canvas
        $('#scorescreen').show();   //show score screen

        game.mode = 'intro';
        game.offsetLeft=0;
        game.ended=false;
        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    },

    handlePanning: function(){
        game.offsetLeft++;  //temporary placeholder that keeps panning to the right.
    },

    animate: function(){
        game.handlePanning();   //animate background
        // animate characters.

        // draw background with parallax scrolling.  TODO: Figure out why this doesn't work.
        game.context.drawImage(game.currentLevel.backgroundImage, game.offsetLeft/4, 0, 640, 480, 0, 0, 640, 480);
        game.context.drawImage(game.currentLevel.foregroundImage, game.offsetLeft, 0, 640, 480, 0, 0, 640, 480);

        // draw slingshot
        game.context.drawImage(game.slingshotImage, game.slingshotX - game.offsetLeft, game.slingshotY);
        game.context.drawImage(game.slingshotFrontImage, game.slingshotX - game.offsetLeft, game.slingshotY);

        if(!game.ended){
            game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
        }
    },

};

// ==================================
// CREATE LEVEL OBJECT ==============
// ==================================

var levels = {
    data: [
        {
            //First level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        },
        {
            //Second level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        },
        {
            //third jeff-level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        }
    ],

    init: function() {
        var html = '';

        //create buttons for every level in levels.data
        for(var i=0; i < levels.data.length; i++) {
            var level = levels.data[i];
            html += '<input type="button" value="' + (i+1) + '">';
        }

        //equivalent to innerHTML = html;
        $('#levelselectscreen').html(html);

        //set button click event handlers to load level
        $('#levelselectscreen input').on('click', function(e){
            levels.load(this.value - 1);
            $('#levelselectscreen').hide();
        });
    },

    //load all data and images for a specific level, add it to the 'game' object.
    load: function(number){
        //declare a new currentLevel object
        game.currentLevel = {
            number: number,
            hero: []
        };
        //game score
        game.score = 0;
        $('#score').html('Score: ' + game.score);

        var level = levels.data[number];

        //load images, then create objects under the 'game' object above.
        game.currentLevel.backgroundImage = loader.loadImage('../images/backgrounds/' + level.background + '.png');
        game.currentLevel.foregroundImage = loader.loadImage('../images/backgrounds/' + level.foreground + '.png');
        game.slingshotImage = loader.loadImage('../images/slingshot.png');
        game.slingshotFrontImage = loader.loadImage('../images/slingshot-front.png');
        
        //Call game.start() once the assets have loaded
        if(loader.loaded){
            game.start();
        } else {
            loader.onload = game.start;
        }
    }
};

// ==================================
// ASSET LOADER OBJECT ==============
// ==================================

var loader = {
    loaded: true,
    loadedCount: 0, //Assets that have been loaded so far.
    totalCount: 0, //total number of assets that need to be loaded.

    //init function
    init: function(){

        //check for sound support
        var mp3Support, oggSupport;
        var audio = document.createElement('audio');
        if(audio.canPlayType) {
            //audio.canPlayType returns: '', 'maybe', or 'probably'
            mp3Support = "" !=audio.canPlayType('audio/mpeg');  //what sorcery is this??
            oggSupport = "" !=audio.canPlayType('audio/ogg; codecs="vorbis"');  //haven't seen this
        } else {
            //audio tag is not supported
            mp3Support = false;
            oggSupport = false;
        }

        //check for ogg, then mp3, then finally set soundFileExtn to 'undefined'
        loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
    },

    //load image function
    loadImage: function(url){
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = document.createElement('image');
        image.src = url;
        image.onload = loader.itemLoaded();

        return image;
    },

    //default sound file extension
    soundFileExtn: ".ogg",

    //load sound function
    loadSound: function(url){
        this.totalCount++;
        this.loaded=false;
        $('#loadingscreen').show();
        var audio = document.createElement('audio');
        audio.src = url + loader.soundFileExtn;
        audio.addEventListener('canplaythrough', loader.itemLoaded, false);
        return audio;
    },
    itemLoaded: function(){
        //increment loadedCount
        loader.loadedCount++;
        
        $('#loadingmessage').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);

        if(loader.loadedCount === loader.totalCount) {
            //all items loaded completely...
            loader.loaded = true;
        }

        //hide loading screen
        $('#loadingscreen').hide();

        //and call the loader.onload method of it exists. (set up as a callback once images are loaded.
        if(loader.onload) {
            loader.onload();
            loader.onload = undefined;
        }
    }
};

// ==================================
// RUN THE GAME =====================
// ==================================

//jquery 3.0 syntax
$(window).on('load', function(e){
    console.log('everything has loaded. ');

    //initialize game
    game.init();

    $('#playButton').on('click', function(e){
        game.showLevelScreen();
    });

});
