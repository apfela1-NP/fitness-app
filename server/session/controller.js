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
    const user = new User(req.body.name, session.users.length, req.body.weight);
    session.users.push(user);
    res.send(user);
})

//display user info based on id
//info can only be displayed if the requesting user is given access by the user whose info they're attempting to access
app.get('/users/:id', (req, res) => {
    var playerId = req.header("playerId");
    if(session.users[req.params.id].sharedwith.includes(String(playerId))){
        res.send("{Name: " + session.users[req.params.id].name + "}, {Exercise: " + session.users[req.params.id].exercise + "}, {Diet: " + session.users[req.params.id].diet + "}");
    }
    else{
        res.send("This user has not granted you access");
    }
})

//displays all users data 
//only admin can view (id = -1)
app.get("/totalusers", function(req, res){
    var playerId = req.header("playerId");
    if(playerId == -1){
        res.send({Users: session.users});    
    }
    else{
        res.send("Only the admin can view the data of all users");
    }
})

//add exercise based on id #
app.post('/exercise', (req, res) => {
    var playerId = req.header("playerId");
    session.addExercise(req.body.work, playerId);
    res.send("exercise added");
})

//display only exercise based on id #
//only the user can view raw data
app.get("/users/:id/exercise", function(req, res){
    var playerId = req.header("playerId");
    if(session.users[req.params.id].id == playerId){
        res.send(session.users[req.params.id].exercise);    
    }
    else{
        res.send("Only the user can view their individual data");
    }
})

//add diet based on id #
app.post('/diet', (req, res) => {
    var playerId = req.header("playerId");
    session.addFood(req.body.food, playerId);
    res.send("diet added");
})

//display only diet based on id #
//only the user can view raw data
app.get("/users/:id/diet", function(req, res){
    var playerId = req.header("playerId");
    if(session.users[req.params.id].id == playerId){
        res.send(session.users[req.params.id].diet);    
    }
    else{
        res.send("Only the user can view their individual data");
    }
})

//add weight based on id #
//only the user can view raw data
app.post('/weight', (req, res) => {
    var playerId = req.header("playerId");
    session.addFood(req.body.weight, playerId);
    res.send("weight added");
})

//display only weight based on id #
//only the user can view raw data
app.get("/users/:id/weight", function(req, res){
    var playerId = req.header("playerId");
    if(session.users[req.params.id].id == playerId){
        res.send(session.users[req.params.id].pastweight);    
    }
    else{
        res.send("Only the user can view their individual data");
    }
})

//add viewing access to specified users
app.post('/sharedwith', (req, res) => {
    var playerId = req.header("playerId");
    session.addAccess(playerId, req.body.id);
    res.send(session.users[req.body.id].name + " can now view your exercise and diet");
})

/*
//view ids shared with certain id
app.get("/sharedwith/:id", function(req, res){
    res.send(session.users[req.params.id].sharedwith);
})*/

module.exports = app;