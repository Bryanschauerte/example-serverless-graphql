const express = require('express');
const body_parser = require('body-parser');
const expressGraphQL = require('express-graphql');
const schema = require('./Goal/schema');

const app = express();
app.use(body_parser.json({ limit: '50mb' }));

//this will allow us to play with the nice graphql interface via node
app.use(
    '/graphql',
    expressGraphQL({
        graphiql: true,
        schema: schema
    })
);

module.exports = app;
