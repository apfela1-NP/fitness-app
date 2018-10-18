
class Session{
    constructor(){
        this.users = [];
    }

    //adds meal to diet array
    addFood(food, id){
        this.users[id].diet.push(food);
    }

    //adds workout to exercise array
    addExercise(work, id){
        this.users[id].exercise.push(work);
    }

    //adds weight to past weight array, assigns weight to the users current weight, updates the bmi
    addWeight(weight, id){
        this.users[id].pastweight.push(this.users[id].weight);
        this.users[id].weight = weight;
        this.users[id].bmi = ((weight*703) / (Math.pow(this.users[id].height, 2))).toFixed(1);
    }

    //returns length of users array
    getUserNumber(){
        return this.users.length;
    }

    //gives access to user with allowedId to view fitness information of user with id
    addAccess(id, allowedId){
        this.users[id].sharedwith.push(allowedId);
        this.users[id].sharedwithName.push(this.users[allowedId].name);
    }


}

class User{
    constructor(name, id, weight, height) {

        this.id = id;
        this.name = name;
        //weight in pounds
        this.weight = weight;
        //height in inches
        this.height = height;
        //bmi is cut off after 1 decimal place
        this.bmi = ((this.weight*703) / (Math.pow(this.height, 2))).toFixed(1);
        this.pastweight = [];
        //admin access (id = -1)
        this.sharedwith = [String(id), "-1"];
        this.sharedwithName = [];
        this.exercise = [];
        this.diet = [];
    }
}

module.exports = {
    User, Session
}