/**
 * Created by jeffersonwu on 8/14/16.
 */

/* ########## SETUP OBJECTS ########## */
//create a game object
var game = {
    /**
     * Start initializing objects, preload assets, and display start screen.
     */
    init: function(){
        //initialize objects
        levels.init();  //initialize level methods
        loader.init();  //initialize loader

        //hide all game layers and display start screen
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        //get handler for canvas and context
        game.canvas = $('#gamecanvas')[0];
        game.context = game.canvas.getContext('2d');
    },
    showLevelScreen: function(){
        $('.gamelayer').hide();
        $('#levelselectscreen').show(750);
    }
}

//create levels object, with level data and functions
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
        }
    ],

    init: function() {
        var html = '';

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

    //load all data and images for a specific level
    load: function(number){
        //declare a new currentLevel object
        game.currentLevel = {
            number: number,
            hero: []
        };
        game.score = 0;
        $('#score').html('Score: ' + game.score);
        var level = levels.data[number];

        //load backgroud, foreground, slingshot images
        game.currentLevel.backgroundImage = loader.loadImage('../images/backgrounds/' + level.background + '.png');
        //TODO: continue here

    }
};

//Asset loader object
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
    loadImage: function(){
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = document.createElement('image');
        image.src = url;
        image.addEventListener('load', function(e){
            loader.itemLoaded();
        });
        return image;
    },
    soundFileExtn: ".ogg",
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


/* ########## RUN GAME ########## */
//jquery 3.0 syntax
$(window).on('load', function(e){
    console.log('everything has loaded. ');

    //initialize game
    game.init();

    // //event listeners for modern approach. book uses onclick= function calls.
    // document.getElementById('playButton').addEventListener('click', function(e){
    //     game.showLevelScreen();
    // });
    $('#playButton').on('click', function(e){
        game.showLevelScreen();
    });

});
