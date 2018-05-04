import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';

let Schema = (dbo) => {                
    const LinkType = new GraphQLObjectType({
        name: "Link",
        fields: () => ({
            _id: {type: GraphQLString},
            title: {type: GraphQLString},
            url: {type: GraphQLString},
        })
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "LinkQuery",
            fields: () => ({
                links: {
                    type: new GraphQLList(LinkType),
                    resolve: () => dbo.collection("links").find({}).toArray()
                }
            })
        })
    });

    return schema;
};

export default Schema;