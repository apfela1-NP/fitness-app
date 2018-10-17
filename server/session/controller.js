const express = require('express');
const { Session, User} = require('./model');

var session = new Session();

const app = express.Router();

//displays number of users
app.get("/", function(req, res){
    res.send({UserNumber: session.getUserNumber()});
})


//create user w/ name
app.post('/users', (req, res) => {
    const user = new User(req.body.name, session.users.length);
    session.users.push(user);
    res.send(user);
})

//display user info based on id
app.get('/users/:id', (req, res) => {
    res.send("{Name: " + session.users[req.params.id].name + "}, {Exercise: " + session.users[req.params.id].exercise + "}, {Diet: " + session.users[req.params.id].diet + "}");
})

//displays users data 
app.get("/totalusers", function(req, res){
    res.send({Users: session.users});
})

//add exercise based on id #
app.post('/exercise', (req, res) => {
    var playerId = req.header("playerId");
    session.addExercise(req.body.work, playerId);
    res.send("exercise added");
})

//display only exercise based on id #
app.get("/exercise/:id", function(req, res){
    res.send(session.users[req.params.id].exercise);
})

//add diet based on id #
app.post('/diet', (req, res) => {
    var playerId = req.header("playerId");
    session.addFood(req.body.food, playerId);
    res.send("diet added");
})

//display only diet based on id #
app.get("/diet/:id", function(req, res){
    res.send(session.users[req.params.id].diet);
})

module.exports = app;