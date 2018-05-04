import express from 'express';
import Schema from './data/schema';
import {MongoClient} from 'mongodb';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import fs from 'fs';

let app = express();
const port = 8888;
const url = "mongodb://localhost/";
const dbname = "hunterdb";

app.use(express.static('public/build'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

(async () => {
    let conn = await MongoClient.connect(url);
    const dbo = conn.db(dbname);
    let schema = Schema(dbo);
    
    app.use('/gql', GraphQLHTTP({
        schema, 
        graphiql: true
    }));
    
    app.listen(port, () => console.log('app running on port', port));
    
    // Genreate schema.json file
    let json = await graphql(schema, introspectionQuery);
    fs.writeFile('../schema.json', JSON.stringify(json, null, 2), err => {
        if (err) throw err;
        console.log("New JSON schema created boisss");
    }); 
})();