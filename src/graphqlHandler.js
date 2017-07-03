'use strict';
import { graphql } from 'graphql';
import { success, failure } from './libs/response-lib';
import schema from './graphql/Goal/schema';

exports.graphqlHandler = (event, context, callback) => {
    let queryStringParameters = Object.assign(
        { query: {} },
        { query: event.pathParameters.query }
    );

    graphql(schema, queryStringParameters.query)
        .then( function(result) {
            console.log(result, 'result');
            return callback(null, success(result));
        })
        .catch(error => {
            console.log(error, 'error');
            return callback(null, failure(error));
        });
}
