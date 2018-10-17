const express = require('express');
const { Session, User} = require('./model');

var session = new Session();

const app = express.Router();

//displays users data and number of users
app.get("/", function(req, res){
    res.send({...session, UserNumber: session.getUserNumber()});
})

//display exercise based on id #
app.get("/exercise/:id", function(req, res){
    res.send(session.users[req.params.id].exercise);
})

//create user w/ name
app.post('/users', (req, res) => {
    const user = new User(req.body.name, session.users.length);
    session.users.push(user);
    res.send(user);
})

//add exercise based on id #
//exercise keeps being input as null!!!!
app.post('/exercise', (req, res) => {
    var playerId = req.header("playerId");
    session.addExercise(req.body.worked, playerId);
    res.send("exercise added");
})

module.exports = app;