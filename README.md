#Croatia-Greece-Play

##Instructions
To run the server:

	ENV_PORT=3000 node <server filename> 
	
To load the Three.JS examples:

    localhost:3000/three/<file number>
	
##Notes Node/Express
- TODO: Work on SSL
- Previous Project: brunchjog-codetuts-play. Handing over on Monday July 20th, 2016, in Split Croatia.
- Includes work files from "Meadowlark Travel website".
- "--save-dev <package>" to save to devDependencies.
    - "--save-dev mocha"
    - copy to mocha.js and mocha.css to public/vendor folder.
    - "--save-dev chai" for assert().
    - copy chai.js to public/vendor.
- dev dependencies that should be included:
    - mocha
    - chai
    - zombie (downgraded to 2.5.1 to work with book, new version might have their own 'assert' methods now)
- including JSHint.
- Types of views:
    - Layouts (frontend)
    - Views (frontend)
    - Blocks (backend data)
    - Partials
    - Sections
- adding 'Nursery'
    - Give up and just use JQuery. You already know a lot of the basics using vanilla JS.
    - Anything you do in JQuery, learn how to do in vanilla JS.
- added Bootstrap to the project for Forms.

- passing form data to another page (DON'T USE, THIS IS GLOBAL! use cookies or sessions instead):
    - use 'app.set('(var name)', (var value));
    - use 'app.get('(var name)');
    
- Externalizing Credentials: Cookies and Sessions
    - USE SIGNED COOKIES, PERIOD.

#Notes Three.JS

##Reference
- [npm cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [Codementor: cookie management in Express.js](https://www.codementor.io/nodejs/tutorial/cookie-management-in-express-js)

##Notes DeviceOrientationEvent API and Geolocation API
- [HTML5 Geolocation](http://www.w3schools.com/html/html5_geolocation.asp) : Using this to find the 'true north' to offset the deviceOrientationValue on start.
- [Google Geolocation](https://developers.google.com/web/fundamentals/native-hardware/user-location/obtain-location?hl=en) : Basics of geoLocation API.
- [Node.JS and HTTPS](http://stackoverflow.com/questions/11744975/enabling-https-on-express-js)
- [Get free SSL](https://mobiforge.com/news-comment/no-https-then-bye-bye-geolocation-in-chrome-50)

##NOTES HTML5 Video Events
- [HTML5 Video Events Videos](https://www.w3.org/2010/05/video/mediaevents.html): download the videos here Canvas video testing.

## NOTES WebSpeechAPI & Annyang
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis)
- [annyang API](https://github.com/TalAter/annyang)

## NOTES Mongoose
- [Mongoose Model](http://mongoosejs.com/docs/models.html)

## NOTES Architecture
- [Architecting a Secure RESTful Node.js app](http://thejackalofjavascript.com/architecting-a-restful-node-js-app/)

## NOTES Canvas
- [MDN Canvas Rendering 2D Context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)


