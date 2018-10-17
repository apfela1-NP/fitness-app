
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

    addAccess(id, allowedId){
        this.users[id].sharedWith.push(allowedId);
    }

   /* checkAccess(id, requestedId){

    }*/

}

class User{
    constructor(name, id) {

        this.id = id;
        this.name = name;
        //this.weight = weight;
        this.sharedWith = [];
        this.exercise = [];
        this.diet = [];
    }
}

module.exports = {
    User, Session
}