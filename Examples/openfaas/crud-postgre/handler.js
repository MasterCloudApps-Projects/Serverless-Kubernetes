"use strict"

const { Client } = require('pg')
const Pool = require('pg').Pool
const fs = require('fs')

const pool = initPool()

module.exports = async (event, context) => {  
    let client = await pool.connect()

    let deviceKey = event.headers["x-device-key"]
    let deviceID = event.headers["x-device-id"]

    if(deviceKey && deviceID) {
        const { rows } = await client.query("SELECT device_id, device_key FROM device WHERE device_id = $1 and device_key = $2", [deviceID, deviceKey]);
        if(rows.length) {

            if(event.method == "POST") {
                await insertStatus(deviceID, event, client);
                client.release()
                return context.status(200).succeed({"status": "OK"});
            } else if(event.method == "GET") {
                let rows = await getStatus(deviceID, event, client);
                client.release()
                return context.status(200).succeed({"status": "OK", "data": rows});
            }
            client.release()
            return context.status(405).fail({"status": "method not allowed"});
        } else {
            client.release()
            return context.status(401).fail({"status": "invalid authorization or device"});
        }
    }

    client.release()
    return context.status(200).succeed({"status": "No action"});
}

async function insertStatus(deviceID, event, client) {
    let uptime = event.body.uptime;
    let temperature = event.body.temperature;

    try {
        let res = await client.query('INSERT INTO device_status (device_id, uptime, temperature_c) values($1, $2, $3)',
        [deviceID, uptime, temperature]);
        console.log(res)
    } catch(e) {
        console.error(e)
    }
}

async function getStatus(deviceID, event, client) {
    let uptime = event.body.uptime;
    let temperature = event.body.temperature;

    let {rows} = await client.query('SELECT * FROM device_status WHERE device_id = $1',
    [deviceID]);
    return rows
}


function initPool() {
  return new Pool({
    user: fs.readFileSync("/var/openfaas/secrets/db-username", "utf-8"),
    host: process.env["db_host"],
    database: process.env["db_name"],
    password: fs.readFileSync("/var/openfaas/secrets/db-password", "utf-8"),
    port: process.env["db_port"],
    ssl : {
        rejectUnauthorized: false
    }
  });
 }