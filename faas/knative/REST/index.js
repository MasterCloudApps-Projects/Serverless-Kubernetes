const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const services = require("./mockup-services");
const port = process.env.PORT || 8080;


// Using middlewares to parse json response objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    services.getAllUsers()
    .then((users) => {
        res.send({
            error: false,
            code: 200,
            message: 'Users fetched successfully',
            data: users
        });
    })
    .catch((err) => {
        res.send({
            error: true,
            code: 200,
            message: err
        });
    });
    
});

// If a route doesn't exist, use this middleware to show a 404 error message
app.use((req, res, next) => {
    res.status(404).send({
        error: true,
        code: 404,
        message: "Url not found!"
    });
});

app.listen(port, () => {
    console.log(`Server initialized in port ${port}`);
});