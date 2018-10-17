const exercise = require('./exercise');
const diet = require('./diet')


class Session{
    constructor(){
        this.users = [];
    }

    addFood(food, id){
        this.users[id].diet.push(food);
    }

    addExercise(work, id){
        this.users[id].exercise.push(work);
    }

    getUserNumber(){
        return this.users.length;
    }

}

class User{
    constructor(name, id) {

        this.id = id;
        this.name = name;
        this.exercise = [];
        this.diet = [];
    }
}

module.exports = {
    User, Session
}