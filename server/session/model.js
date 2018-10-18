
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

    addWeight(weight, id){
        this.users[id].pastweight.push(weight);
        this.users[id].weight = weight;
    }

    getUserNumber(){
        return this.users.length;
    }

    addAccess(id, allowedId){
        this.users[id].sharedwith.push(allowedId);
    }

}

class User{
    constructor(name, id, weight) {

        this.id = id;
        this.name = name;
        this.weight = weight;
        this.pastweight = [];
        this.sharedwith = [String(id)];
        this.exercise = [];
        this.diet = [];
    }
}

module.exports = {
    User, Session
}