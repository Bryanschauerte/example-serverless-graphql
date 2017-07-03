const GoalIncrement = `
    type GoalIncrement {
        id: Int!
        label: String
        goalID: Int
        goal:[Goal]
    }`;

module.exports = GoalIncrement;
