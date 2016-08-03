/**
 * Created by jeffersonwu on 8/3/16.
 * moving all dummy databse data to this module
 */

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
            release: '2005',
            description: 'A free-running game where you hunt treasures through time via genetic memories.'
        },
        {
            name: 'Grand Theft Auto 5',
            developer: 'Rockstar North',
            release: '2014',
            description: 'Do all the bad things you\'ve wanted to do without getting arrested or killed.'
        },
        {
            name: 'Forza Motorsports',
            developer: 'Turn 10',
            release: '2003',
            description: 'Practice driving in this GranTourismo competitor.'
        }
    ]
};

exports.getBasicWeatherData = function(){
    return basicWeatherData;
};

exports.getGameData = function(){
    return gameData;
};