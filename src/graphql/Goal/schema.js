const { makeExecutableSchema } = require('graphql-tools');
const Goal = require('./Fragments/goal');
const GoalIncrement = require('./Fragments/goalIncrement');
const GoalMutation = require('./Fragments/goalMutation');
const {
    find,
    filter } = require('lodash');

let {
    goalsDB,
    goalIncrementsDB
} = require('./mockDB');

const RootQuery = `
    type Query {
        goalIncrements: [GoalIncrement]
        goal(id: Int!): Goal
        goals: [Goal]
    }`;

const schema =  makeExecutableSchema({
    typeDefs: RootQuery.concat(Goal, GoalIncrement, GoalMutation),
    resolvers: {
        Query: {
            goalIncrements: () => goalIncrementsDB,
            goal: (_, { id }) => find(goalsDB, { id: id }),
            goals: () => goalsDB
        },
        Mutation: {
            updateLabel: (_, { incrementID, change }) => {
                const incrementTarget = find(goalIncrementsDB, { id: incrementID });
                if (!incrementTarget) {
                    throw new Error(`Couldn't find post with id ${incrementID}`);
                }
                incrementTarget.label = change;

                return incrementTarget;
            }
        },
        Goal: {
            goalIncrements: (goal) => filter(goalIncrementsDB, { goalID: goal.id })
        },
        GoalIncrement: {
            goal: (goalIncrement) => find(goalsDB, { id: goalIncrement.goalID })
        }
    }
});

module.exports = schema;
