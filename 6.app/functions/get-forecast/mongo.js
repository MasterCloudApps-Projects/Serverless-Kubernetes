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
            useNewUrlParser: true
        });
    }
    
    let db = client.db(database);
    entryCollection = db.collection("forecast");

    return {
        getForecast: async (aemetid) => {
            let entry;
            try {
                entry = await entryCollection.findOne({aemetid:aemetid});
                console.log(`MONGO:  ${entry}`);
            } catch (error) {
                console.error(error);
                throw error;
            }
            if(!entry) throw {statusCode: 404, message: 'Not Found'};
            console.log(`MONGO: salida`);
            return entry;
        },
        getEntries: async () => {
            return await entryCollection.find({}).toArray();
        },
    };
};


