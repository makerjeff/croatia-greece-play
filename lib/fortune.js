/**
 * Fortune module
 * Created by jeffersonwu on 7/22/16.
 */

var fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
];

//export only what you want to expose
exports.getFortune = function() {
    var index = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[index];
};
