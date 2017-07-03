const GoalMutation = `
    type Mutation {
        updateLabel(incrementID: Int!, change: String): GoalIncrement
    }`;

module.exports = GoalMutation;
