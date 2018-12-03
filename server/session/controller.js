const express = require('express');
const { Session, Workout, Meal} = require('./model');

var session = new Session();

const app = express.Router();

//displays number of users
app.get("/", function(req, res){
    res.send({...session});
})


//create user w/ name
app.post('/users', (req, res) => {
    const user = session.login(req.body.name, req.body.fbid, req.body.access_token);
    res.send(user);
})

//display user info based on id
//info can only be displayed if the requesting user is given access by the user whose info they're attempting to access
app.get('/users/:id', (req, res) => {
    var playerId = req.header("playerId");
    if(session.users[req.params.id].sharedwith.includes(String(playerId))){
        var exerciseString = " has completed the following exercises: ";
        var i;
        //string creation for exercise
        for(i = 0; i < session.users[req.params.id].exercise.length; i++){
            exerciseString += ("On " + session.users[req.params.id].exercise[i].date + " " + session.users[req.params.id].name + " did " + session.users[req.params.id].exercise[i].work + " for " + session.users[req.params.id].exercise[i].duration + ". \n");
        }

        var dietString = " has eaten the following meals: ";
        //string creation for diet
        for(i = 0; i < session.users[req.params.id].diet.length; i++){
            dietString += ("On " + session.users[req.params.id].diet[i].date + " " +session.users[req.params.id].name +" ate " + session.users[req.params.id].diet[i].food + ". \n");
        }
       
        res.send(session.users[req.params.id].name +  exerciseString + session.users[req.params.id].name + dietString + 
        session.users[req.params.id].name + " has previously weighed: " + session.users[req.params.id].pastweight +
        "\n" + session.users[req.params.id].name + " currently weighs " + session.users[req.params.id].weight + ", has a height of " + session.users[req.params.id].height + " inches, and a bmi of " + session.users[req.params.id].bmi);
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
    const date = new Date();
    const workout = new Workout(req.body.work, req.body.duration, date)
    session.addExercise(workout, playerId);
    res.send("exercise added");
})

//display only exercise based on id #
//only the user can view individual data
app.get("/users/:id/exercise", function(req, res){
    var playerId = req.header("playerId");
    if((session.users[req.params.id].id == playerId) || (playerId == -1)){
        var string = "";
        var i;
        //string creation for user exercise (work, duration, date)
        for(i = 0; i < session.users[req.params.id].exercise.length; i++){
            string += ("On " + session.users[req.params.id].exercise[i].date + " you did " + session.users[req.params.id].exercise[i].work + " for " + session.users[req.params.id].exercise[i].duration + ". \n");
        }
        res.send(string);
    }
    else{
        res.send("Only the user can view their individual data");
    }
})

//add diet based on id #
app.post('/diet', (req, res) => {
    var playerId = req.header("playerId");
    const date = new Date();
    const meal = new Meal(req.body.food, date)
    session.addFood(meal, playerId);
    res.send("diet added");
})

//display only diet based on id #
//only the user can view individual data
app.get("/users/:id/diet", function(req, res){
    var playerId = req.header("playerId");
    if((session.users[req.params.id].id == playerId) || (playerId == -1)){
        var string = "";
        var i;
        //string creation for user diet (food, date)
        for(i = 0; i < session.users[req.params.id].diet.length; i++){
            string += ("On " + session.users[req.params.id].diet[i].date + " you ate " + session.users[req.params.id].diet[i].food + ". \n");
        }
        res.send(string);
    }
    else{
        res.send("Only the user can view their individual data");
    }
})

//add weight based on id #
app.post('/weight', (req, res) => {
    var playerId = req.header("playerId");
    session.addWeight(req.body.weight, playerId);
    res.send("weight added");
})

//display only weight based on id #
//only the user can view individual data
app.get("/users/:id/weight", function(req, res){
    var playerId = req.header("playerId");
    if((session.users[req.params.id].id == playerId) || (playerId == -1)){
        res.send("Your current weight: " + session.users[req.params.id].weight + 
        "\n" + "Your previous weights: " + session.users[req.params.id].pastweight);    
    }
    else{
        res.send("Only the user can view their individual data");
    }
})
//display only bmi based on id #
//only the user can view individual data
app.get("/users/:id/bmi", function(req, res){
    var playerId = req.header("playerId");
    if((session.users[req.params.id].id == playerId) || (playerId == -1)){
        res.send("Your current bmi: " + session.users[req.params.id].bmi);    
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


//view names of people who can view your fitness information
//only user can view individual data
app.get("/users/:id/sharedwith", function(req, res){
    var playerId = req.header("playerId");
    if((session.users[req.params.id].id == playerId) || (playerId == -1)){
        res.send("Users who can view your fitness information: " + session.users[req.params.id].sharedwithName);
    }
    else{
        res.send("Only the user can view their individual data");
    }
})

module.exports = app;