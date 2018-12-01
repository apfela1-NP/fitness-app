<template>
<div class="home">
    <div class="jumbotron">
    <div class="container text-center">
        <h1 class="display-3">Fitness App</h1>
        <p class="lead">
          Follow your progress and stay on track using the simplest and most effective fitness app around. Our services include diet tracking, exercise tracking, and more to make sure you reach your goals!
        </p>
       <div class="row">
        <div class="col-md-4">
            <div class="card" >
                    <h5 class="card-header">
                        Users
                        <a @click.prevent="login" class="btn btn-sm btn-primary" :class="{disabled: playerId() !== null}">+</a>
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="u in state.users" :key="u.id"
                            class="list-group-item">
                            <img />
                            <h5>{{u.name}}</h5>
                            <span class="badge badge-primary badge-pill">{{u.bmi}}</span>
                        </li>
 
                    </ul>
            </div>
        </div>
    </div>
    </div>
  </div>
  <div class="container">
  <div class="row">
    <div class="col">
      <figure>
        <img class="img-fluid rounded-circle" src="https://www.verywellfit.com/thmb/BebPKxIRNfz-QYECQfu9CaW2DSU=/1920x1080/filters:fill(FFDB5D,1)/Illo_Exercise-5a626d274e4f7d00373dead6.png" alt="Exercise">
        <figcaption>After each workout, the user can type the description of his/her workout (e.g. 10 reps and 3 sets of…) into a note (and add pictures if desired). The user can also input the time for how long he/she worked out. The user can then tag this note with certain tags for which body part he/she worked out that day (e.g. legs, arms, core, etc.) or what type of training (e.g. cardio, strength training, flexibility, etc.) or rest (because rest days are important).</figcaption>
      </figure>
    </div>
    <div class="col">
      <figure>
        <img class="img-fluid rounded-circle" src="http://designatprinting.com/wp-content/uploads/healthy-food-clipart-25-18-clip-art.jpg" alt="Diet">
        <figcaption>
            The user can input exactly what they're eating into a note so he/she can reference it in the future. The user can tag this with certain nutritional tags (e.g. protein, carbs, etc.) or more specifically by food groups (e.g. fruit, vegetables, meat, etc.). The purpose of the diet tracking is not meant to track every calorie but to enable the user to have a general idea what he/she is eating on a consistent basis. Calorie counting and tracking exact nutritional information is not necessary for most people. 
        </figcaption>
      </figure>
    </div>
    <div class="col">
      <figure>
        <img class="img-fluid rounded-circle" src="https://www.eastvista.com/wp-content/uploads/2016/11/small-steps.png" alt="Progress">
        <figcaption>
            The user can update his/her weight at anytime but he/she will be prompted to do so weekly in order to track progress. In addition, BMI will be tracked based on height and current weight.
            The user can view progress numerically or graphically.            
        </figcaption>
      </figure>
    </div>
  </div>
  </div>
</div>
</template>


<style lang="scss">
    li.list-group-item {
        display: flex;
        align-content: center;
        justify-content: space-between;
        img {
            width: 30px; height: 30px;
            margin-right: 5px;
        }
        h5 {
            flex-grow: 1;
        }
    }
</style>

<script>
import { GetState, Login, playerId } from '@/services/api_access';
export default {
    data: function(){
        return {
            state: {
                users: []
            },
            myWeights: [],
            myHeight: "",
            myWeight: "",
            myBMI: 0,

            //playerId: null
        }
    },
    methods: {
        refresh(){
            GetState()
            .then(x=> this.state = x)
        },
        login: function() {
            Login(prompt('What is your name?'), prompt('What is your weight?'), prompt('What is your height?'))
            .then(()=> this.refresh())
        },
        playerId: ()=> playerId
    }
}
</script>