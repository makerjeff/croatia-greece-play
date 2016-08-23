/**
 * Created by jeffersonwu on 8/4/16.
 * Expanding on the Meadowlark nursery AJAX chapter, making this module random.
 * Handlebars on the Frontend.
 */

var animals = [
    'aardvark',
    'bird',
    'cat',
    'dog',
    'elephant',
    'fish',
    'goat',
    'hen',
    'insect',
    'jack rabbit',
    'koala',
    'lion',
    'mongoose',
    'nigerian bobcat',
    'owl',
    'porcupine',
    'quail',
    'rat',
    'snake',
    'toad',
    'ugly mofo',
    'venomous cattle',
    'whoopin\' monkey',
    'xee bee',
    'yellow donkey',
    'zebra'
];
var bodyParts = ['arm', 'leg', 'head', 'neck', 'torso', 'buttocks', 'genitalia'];
var adjectives = ['dirty', 'clean', 'disgusting', 'beautiful', 'wondrous', 'amazing'];
var nouns = ['a car', 'a clock', 'a tv', 'a keyboard', 'a bucket', 'a toothbrush'];

exports.getRandomAnimal = function(){
    var result = animals[Math.floor(Math.random() * animals.length)];
    console.log('animal exported: ' + result);
    return result;
};
exports.getRandomBodyPart = function(){
    var result = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    console.log('bodyPart exported: ' + result);
    return result;
};
exports.getRandomAdjective = function(){
    var result = adjectives[Math.floor(Math.random() * adjectives.length)];
    console.log('adjective exported: ' + result);
    return result;
};
exports.getRandomNoun = function(){
    var result = nouns[Math.floor(Math.random() * nouns.length)];
    console.log('noun exported: ' + result);
    return result;
};
