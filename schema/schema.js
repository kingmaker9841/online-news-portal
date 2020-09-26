const {gql} = require('apollo-server-express');
const {Date} = require('./resolvers');

const typeDefs = gql`

    scalar Date

    type Category {
        name : String!
    }
    type Article {
        headline : String!
        summary : String!
        description : String!
        source : String!
        state : String!
        mainImage : String!
        galleryImage : [String]!
        publishDate: Date!
        createdDate: Date!
        lastModifiedDate: Date!
        category: String!
    }
    type Query {
        categories : [Category]
        article (id: ID!) : Article
        headlines : [String]!
        articles : [Article]
        articleCategory (category: String!) : [Article]
    }
    type Mutation {
        addCategory (name: String!) : CategoryResponse!
        addArticle (
            headline : String!
            summary : String
            description: String!
            source : String!
            state: String
            mainImage: String!
            galleryImage: [String]
            publishDate: Date!
            createdDate: Date!
            lastModifiedDate: Date!
            category: String!
        ) : ArticleResponse!
    }
    type CategoryResponse {
        success: Boolean!
        message: String
        category : String
    }
    type ArticleResponse {
        success: Boolean!
        message: String,
        result: Article
    }
`;

module.exports = typeDefs;