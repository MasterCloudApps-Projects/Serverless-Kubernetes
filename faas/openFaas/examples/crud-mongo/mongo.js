const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const fs = require('fs');
const database= process.env["db_name"]; //myApp

function initConexion() {
    const user = fs.readFileSync("/var/openfaas/secrets/username", "utf-8"), 
    password = fs.readFileSync("/var/openfaas/secrets/password", "utf-8"),
    host =  process.env["db_host"]; 

    return `mongodb+srv://${user}:${password}@${host}/admin?replicaSet=rs0&ssl=false`;
}

var url = initConexion();

// Data base connection and initialization
var entryCollection;
var client;
module.exports = async () => {    

    if(!client){
        console.log("MONGO: connect to -> " + url);    
        client = await MongoClient.connect(url, {
            // connectWithNoPrimary:true,
            // useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }
    
    let db = client.db(database);
    entryCollection = db.collection("entry");

    return {
        getEntries: async () => {
            return await entryCollection.find({}).toArray();
        },
        getEntryById: async (id) => {
            let entry;
            try {
                entry = await entryCollection.findOne({_id:new Mongo.ObjectID(id)});
                console.log(`MONGO:  ${entry}`);
            } catch (error) {
                console.error(error);
                throw error;
            }
            if(!entry) throw {statusCode: 404, message: 'Not Found'};
            console.log(`MONGO: salida`);
            return entry;
        },
        newEntry: async (entry) => {
            let response = await entryCollection.insertOne(entry);
            return response.ops[0];
        },
        deleteEntry: async (id) => {
            let r = await entryCollection.findOneAndDelete({_id:new Mongo.ObjectID(id)});
            if(!r.value) throw {statusCode: 404, message: 'Not Found'};
            return r.value;
        },
        editEntry: async (id, entry) => {
            console.log("MONGO: entry id "+id);
            let r = await entryCollection.findOneAndUpdate({_id:new Mongo.ObjectID(id)}, {$set: entry}, {returnOriginal: false});
            if(!r.value) throw {statusCode: 404, message: 'Not Found'};
            return r.value;
        },
        newEntryComment: async (entryId, comment) => {
            comment._id = Mongo.ObjectID();
            let r = await entryCollection.findOneAndUpdate({_id:new Mongo.ObjectID(entryId)}, {$push: {comments:comment}}, {returnOriginal: false});
            if(!r.value) throw {statusCode: 404, message: 'Not Found'};
            return r.value;
        },
        deleteEntryComment: async (entryId, commentId) =>{
            let r = await entryCollection.findOneAndUpdate({_id:new Mongo.ObjectID(entryId)}, {$pull: {comments:{_id:Mongo.ObjectID(commentId)}}}, {returnOriginal: false});
            if(!r.value) throw {statusCode: 404, message: 'Not Found'};
            return r.value;
        }
    };
};


