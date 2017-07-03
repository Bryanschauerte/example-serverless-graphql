# Serverless GraphQL On AWS Lambda

GraphQL is a very powerful query language for APIs. It allows us to 'mock' out how we want the response (exactly what is needed, no more overfetching!) and choose how we want certain requests to resolve. The best part is USING it to create better endpoint to help migrate legacy database queries.

## THIS Repo

  - Provides an example of how to modularize schemas (an excerpt from my Progress-Up app)
  - How to implement GraphQL Node/Express server
   -- Query examples
  - How to implement GraphQL serverless AWS lambdas

### Tech

This took a lot of tinkering and misdirection from 'How-To' articles.
* [node.js] - evented I/O for the backend
* [graphql](https://www.npmjs.com/package/graphql) - JavaScript reference implementation for GraphQL
* [express-graphql](https://www.npmjs.com/package/express-graphql) - For Node's GraphQL HTTP server
* [serverless](https://serverless.com/) to take the stress out of Amazon Web Services
* [graphql-tools](https://www.npmjs.com/package/graphql-tools) - For the handy 'makeExcutableSchema' function when modularizing schemas
 * [casual](https://www.npmjs.com/package/casual) - To generate more interesting mock database entries.

### Installing
Install the dependencies and devDependencies.

```sh
$ cd example-serverless-graphql
$ npm install
```

You will also need [serverless](https://serverless.com/) to invoke the handler for testing.
```sh
$ npm install -g serverless
```

[Node](https://nodejs.org) to have a local instance of the server

## Usage

### Node

```sh
$ npm run localNodeServer
```

This will run a server at http://127.0.0.1:4000
The graphQL super awesome interface will be at http://127.0.0.1:4000/graphql

You can then navigate to the interface to play with the queries or make a GET request using postman to
http://127.0.0.1:1337/graphql?query={goals{name}}

example response
-```{
  "data": {
    "goals": [
      {
        "name": "Jarrod Considine"
      },
      {
        "name": "Vickie Treutel"
      },
      {
        "name": "Dedrick Feil"
      },
      {
        "name": "Carlo Wunsch"
      },
      {
        "name": "Hellen Breitenberg"
      },
      {
        "name": "Lorena Towne"
      }
    ]
  }
}```

or
http://127.0.0.1:1337/graphql?query={goals{name id goalIncrements{label}}}

Example response
-```{
  "data": {
    "goals": [
      {
        "name": "Jarrod Considine",
        "id": 0,
        "goalIncrements": [
          {
            "label": "Multi-layered object-oriented framework"
          }
        ]
      },
      {
        "name": "Vickie Treutel",
        "id": 1,
        "goalIncrements": []
      },
      {
        "name": "Dedrick Feil",
        "id": 2,
        "goalIncrements": [
          {
            "label": "Facetoface regional archive"
          },
          {
            "label": "Switchable full-range policy"
          }
        ]
      },
      {
        "name": "Carlo Wunsch",
        "id": 3,
        "goalIncrements": [
          {
            "label": "Multi-layered hybrid core"
          }
        ]
      },
      {
        "name": "Hellen Breitenberg",
        "id": 4,
        "goalIncrements": [
          {
            "label": "Synergistic dynamic contingency"
          },
          {
            "label": "Cloned intangible GraphicalUserInterface"
          }
        ]
      },
      {
        "name": "Lorena Towne",
        "id": 5,
        "goalIncrements": []
      }
    ]
  }
}```
or just one goal by id
http://127.0.0.1:1337/graphql?query={goal(id:1){name id goalIncrements{label}}}

But the most fun is just at the beautiful interface
http://127.0.0.1:4000/graphql

You can also make http requests from a client as long as the parameters sent have a 'query' key with a stringified graphql object as the value.

### Amazon Lambda
*Forwarning! BE very careful when searching the interwebs for 'graphql on lambda'. There is soooo much outdated garbage out there(npm packages/ "How To's")!! I spent far too long trying to get people's packages to work before I just did it by debugging the old fashion way and no extra packages.*

[Serverless](https://serverless.com/) - The real hero. Use it and be grateful if you'd much rather code than paw through AWS Docs trying to find a missed setting.

The serverless.yml file sets the configuration for our lambda (pretty straight forward by reading it).

Invoke the function (graphqlHandler.js) using test request in graphqlHandler.test.json
```sh
$ npm run invokeFunction
```
Should result in a response like this. (Names would change thanks to Casual)
```
{ statusCode: 200,
  headers:
   { 'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true },
  body: '{"data":{"goals":[{"name":"Davin West","id":0,"goalIncrements":[{"id":4}]},{"name":"Rosie Barrows","id":1,"goalIncrements":[{"id":2},{"id":3}]},{"name":"Citlalli Kautzer","id":2,"goalIncrements":[{"id":0},{"id":5}]},{"name":"Hailey Gaylord","id":3,"goalIncrements":[]},{"name":"Dayne Heaney","id":4,"goalIncrements":[]},{"name":"Skylar Brakus","id":5,"goalIncrements":[{"id":1}]}]}}' }```
