const Mongo = require("mongodb");
const MongoClient = Mongo.MongoClient;
const fs = require('fs');
const database= process.env["db_name"];

function initConexion() {
    const user = fs.readFileSync("/var/openfaas/secrets/username", "utf-8"), 
    password = fs.readFileSync("/var/openfaas/secrets/password", "utf-8"),
    host =  process.env["db_host"]; 

    return `mongodb+srv://${user}:${password}@${host}/admin?replicaSet=rs0&ssl=false`;
}

var url = initConexion();

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
    entryCollection = db.collection("forecast");

    return {
        saveForecast: async (forecast) => {
            console.log("MONGO: entry id "+forecast.aemetid);
            try {
                const entry = await entryCollection.findOne({aemetid:forecast.aemetid});
                console.log(`MONGO:  ${entry}`);
                if(entry){
                    console.log(`MONGO:  UPDATE`);
                    let r = await entryCollection.findOneAndUpdate({_id:new Mongo.ObjectID(entry._id)}, {$set: forecast}, {returnOriginal: false});
                    if(!r.value) throw {statusCode: 404, message: 'Not Found'};
                    return r.value;
                } else {
                    console.log(`MONGO: NEW`);
                    let response = await entryCollection.insertOne(forecast);
                    return response.ops[0]; 
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    };
};


