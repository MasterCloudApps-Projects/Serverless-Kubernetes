const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;

var url = "mongodb+srv://myApp:myAppPassword@my-cluster-name-rs0-0.psmdb.svc.cluster.local/admin?ssl=false";
// var url = "mongodb+srv://myApp:myAppPassword@10.152.183.38/admin?ssl=false";
// var url = "mongodb+srv://myApp:myAppPassword@my-cluster-name-rs0.psmdb.svc.cluster.local/admin?replicaSet=rs0&ssl=false";


// Data base connection and initialization
var entryCollection;
var client;
module.exports = async () => {    

    if(!client){
        client = await MongoClient.connect(url, {
            connectWithNoPrimary:true,
            // useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("MONGO: connect to -> " + url);    
    }
    
    let db = client.db("myApp");
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


