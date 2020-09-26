const Article = require('../models/Article');
const Categories = require('../models/Category');
const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const dayjs = require('dayjs');

const resolvers = {
    Query : {
        categories : (_,__)=>{
            return Categories.find({});
        },
        article :  (_, args)=>{
            return Article.findById(args.id);
        },
        headlines : async (_, args)=>{
            try {
                let waiting = await Article.find({}, (err,res)=>{
                    if (err) return undefined;
                    return res;
                });
                return waiting.map(item=> item.headline);
            } catch (err){
                return undefined;
            }
        }
    },
    Date : new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom Scalar type',
        parseValue(value){
            let parsed = dayjs(value);
            return parsed; // value from client
        },
        serialize(value){
            console.log("Serialize",value);
            return dayjs(value).format("MM-DD-YYYY"); //value to client
             
        },
        parseLiteral(ast){
            console.log(ast);
            if (ast.kind === Kind.STRING){
                return dayjs(ast.value);
            }
            return null;
        }
    }),
    Mutation : {
        addCategory: async (parent, args, context, info)=>{
           let cat = new Categories({
               name: args.name
           });
           try {
            let saving = await cat.save();
            return {
                success: true,
                message: "Successfully Added",
                category: saving.name
            }
           } catch(err){
               return {
                   success: false,
                   message: "Sorry"
               }
           }
        },
        addArticle: async (parent, args, context, info)=>{
            let {headline, summary,state, description, source,
            mainImage, galleryImage, publishDate, createdDate,
            lastModifiedDate} = args;
            console.log(headline, summary,state, description, source,
                mainImage, galleryImage, publishDate, createdDate,
                lastModifiedDate);
            let art =  new Article({
                headline, summary, state, description, source, mainImage,
                galleryImage, publishDate, createdDate, lastModifiedDate
            });
            try {
                let artWait = await art.save();
                console.log(artWait);
                return {
                    success: true,
                    message: "Successfully Added",
                    result: artWait
                }
            } catch (err){
                return {
                    success: false,
                    message: "Cannot Add Article"
                }
            }

        }
    }
}


module.exports = resolvers