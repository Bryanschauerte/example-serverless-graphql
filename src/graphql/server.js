//test server w/o serverless serve
const cors = require('cors');
const app = require('./app');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());
app.set('port', 4000);
app.listen(
    4000,
    () => {
        const port = app.get('port');
        console.log(`GraphQL Server Running at http://127.0.0.1:${port}`);
        console.log(`GraphQL interface located at http://127.0.0.1:${port}/graphql`);
    }
);

//Allows us to make a query via anything you want from the client, for example axios
// http://127.0.0.1:1337/graphql?query={goals{name}}
//http://127.0.0.1:1337/graphql?query={goals{name id goalIncrements{ label}}}
//http://127.0.0.1:1337/graphql?query={goal(id:1){name id goalIncrements{ label}}}

module.exports = app;
