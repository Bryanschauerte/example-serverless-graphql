const casual = require('casual');
const numOfGoalIncrements = 20;
const numOfGoals = 5;

casual.define('goalsDB', function(id) {
    return {
        id: id,
        name: `${casual.first_name} ${casual.last_name}`
    };
});

casual.define('goalIncrementsDB', function(id) {
    return {
        id: id,
        goalID: casual.integer(0, 5),
        label: casual.catch_phrase
    };
});

function fillMock(num, constructor){
    let arrayToReturn = [];
    for (var i = 0; i <= num; i++){
        arrayToReturn.push(casual[constructor](i));
    }
    return arrayToReturn;
}

let goalsDB = fillMock(numOfGoals, 'goalsDB');
let goalIncrementsDB = fillMock(numOfGoals, 'goalIncrementsDB');

module.exports = {
    goalsDB,
    goalIncrementsDB
};
