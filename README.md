#Croatia-Greece-Play

##Instructions
To run the server:

	ENV_PORT=3000 node <server filename> 
	
To load the Three.JS examples:

    localhost:3000/three/<file number>
	
##Notes Node/Express
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

#Notes Three.JS

##Reference
