/**
 * Created by jeffersonwu on 8/3/16.
 * moving all dummy database data to this module.
 * future will be home for data getters and DB manipulators.
 */

var weatherData = {
    locations: [
        {
            name: 'Portland',
            forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
            iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
            weather: 'Overcast',
            temp: '54.1 F (12.3 C)'
        },
        {
            name: 'Bend',
            forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
            iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
            weather: 'Partly Cloudy',
            temp: '55.0 F (12.8 C)'
        },
        {
            name: 'Manzanita',
            forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
            iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
            weather: 'Light Rain',
            temp: '55.0 F (12.8 C)'
        }
    ]
};
var basicWeatherData = {
    locations: [
        {
            name: 'Los Angeles',
            weather: 'Sunny',
            temp: '96 F',
            url: 'http://localhost:3000/los angeles'
        },
        {
            name: 'San Gabriel',
            weather: 'Sunny',
            temp: '100 F',
            url: 'http://localhost:3000/san gabriel'
        },
        {
            name: 'Alhambra',
            weather: 'Sunny',
            temp: '102 F',
            url: 'http://localhost:3000/alhambra'
        }
    ]
}
var gameData = {
    videoGames: [
        {
            name: 'Assassins Creed',
            developer: 'Ubisoft',
            developerUrl: 'http://www.ubisoft.com',
            release: '2005',
            description: 'A free-running game where you hunt treasures through time via genetic memories.'
        },
        {
            name: 'Grand Theft Auto 5',
            developer: 'Rockstar North',
            developerUrl: 'http://www.rockstar.com/north',
            release: '2014',
            description: 'Do all the bad things you\'ve wanted to do without getting arrested or killed.'
        },
        {
            name: 'Forza Motorsports',
            developer: 'Turn 10',
            developerUrl: 'http://www.turn10.com',
            release: '2003',
            description: 'Practice driving in this GranTourismo competitor.'
        },
        {
            //intentially leaving out developerUrl for Handlebars
            name: 'Rainbow Six: Vegas 2',
            developer: 'Ubisoft',
            //developerUrl: 'http://www.ubisoft.com',
            release: '2006',
            description: 'Fight terrorism in Las Vegas as one of the elite Rainbow members.'
        }
    ]
};

exports.getWeatherData = function(){
    return weatherData;
};
exports.getBasicWeatherData = function(){
    return basicWeatherData;
};
exports.getGameData = function(){
    return gameData;
};