'use strict';

let {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');


// const axios = require('axios');
const db = [
    {
        id: 888,
        name: 'eat Chicken',
        value: 22
    },
    {
        id: 6664,
        name: 'eat beef',
        value: 1111
    }
];
// when dont define, uses feild on object passed to it
const resolver = {
    queryGoalsById:  (args) => {//(obj, args, context, info)

        let dbPromise = new Promise((resolve, reject) => {
            let found = [];
            setTimeout(function(){
                db.map(goal => {
                    found.push(goal);
                });
                resolve(found); // Yay! Everything went well!
            }, 250);
        });

        dbPromise.then(
            (res) => {
                console.log(res, 'res');

                return res;
            }).catch(
                (err) => {
                    console.log('fail', err);
                }
            );
        console.log(args, 'args');

    // const URL = `https://www.reddit.com/r/${ args.subreddit || 'javascript' }.json`;
    //
    // return axios.get( URL )
    // 	.then( (response) => {
    // 		const __posts = [];
    // 		const posts = response.data.data.children;
    //
    // 		posts.map( post => {
    // 			post.data.content = post.data.selftext_html;
    // 			__posts.push( post.data );
    // 		} );
    // 		return __posts;
    // 	})
    // 	.catch( (error) => {
    // 		return { error: error }
    // 	});
        console.log(args, 'args');

        return dbPromise;
}
};

const GoalsController = {

    index: (args) => {//(obj, args, context, info)

        let dbPromise = new Promise((resolve, reject) => {
            let found = [];
            setTimeout(function(){
                db.map(goal => {
                    found.push(goal);
                });
                resolve(found); // Yay! Everything went well!
            }, 250);
        });

        dbPromise.then(
            (res) => {
                console.log(res, 'res');

                return res;
            }).catch(
                (err) => {
                    console.log('fail', err);
                }
            );
        console.log(args, 'args');

    // const URL = `https://www.reddit.com/r/${ args.subreddit || 'javascript' }.json`;
    //
    // return axios.get( URL )
    // 	.then( (response) => {
    // 		const __posts = [];
    // 		const posts = response.data.data.children;
    //
    // 		posts.map( post => {
    // 			post.data.content = post.data.selftext_html;
    // 			__posts.push( post.data );
    // 		} );
    // 		return __posts;
    // 	})
    // 	.catch( (error) => {
    // 		return { error: error }
    // 	});
        console.log(args, 'args');

        return dbPromise;
    }


};

module.exports = resolver;
