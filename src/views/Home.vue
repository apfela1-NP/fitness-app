<template>
<div class="home">
    <div class="jumbotron">
    <div class="container text-center">
        <h1 class="display-3">Fitness App</h1>
        <p class="lead">
          Follow your progress and stay on track using the simplest and most effective fitness app around. Our services include diet tracking, exercise tracking, and more to make sure you reach your goals!
        </p>
            <a @click.prevent="login" class="btn btn-sm btn-primary" :class="{disabled: playerId !== null}">Login</a>
            <p><i v-if="playerId !== null && state.users[playerId]">(Welcome {{state.users[playerId].name}})</i></P>
              
    </div>
  </div>
  <div class="container">
  <div class="row">
    <div class="col">
      <figure>
        <img class="img-fluid rounded-circle" src="https://www.verywellfit.com/thmb/BebPKxIRNfz-QYECQfu9CaW2DSU=/1920x1080/filters:fill(FFDB5D,1)/Illo_Exercise-5a626d274e4f7d00373dead6.png" alt="Exercise">
        <figcaption>After each workout, the user can type the description of his/her workout (e.g. 10 reps and 3 sets of…) into a note. The user can also input the time for how long he/she worked out.</figcaption>
      </figure>
    </div>
    <div class="col">
      <figure>
        <img class="img-fluid rounded-circle" src="http://designatprinting.com/wp-content/uploads/healthy-food-clipart-25-18-clip-art.jpg" alt="Diet">
        <figcaption>
            The user can input exactly what they're eating into a note so he/she can reference it in the future. The purpose of the diet tracking is not meant to track every calorie but to enable the user to have a general idea what he/she is eating on a consistent basis.
        </figcaption>
      </figure>
    </div>
    <div class="col">
      <figure>
        <img class="img-fluid rounded-circle" src="https://www.eastvista.com/wp-content/uploads/2016/11/small-steps.png" alt="Progress">
        <figcaption>
            The user can update his/her weight at anytime. In addition, BMI will be tracked based on height and current weight.
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
import * as api from '@/services/api_access';
import * as fb from '@/services/facebook';
// eslint-disable-next-line
let loopTimer = null;

export default {
    data(){
        return {
            playerId: null,
            state: {
                users: [],
            },

        }
    },
    created() {
        loopTimer = setInterval(this.refresh, 1000);
        api.events.$on("playerId", x=> this.playerId = x);
        
    },
    methods: {
        refresh(){
            api.GetState()
            .then(x=> this.state = x)
        },
        login() {
            fb.FBLogin();
            //.then(()=> this.refresh())
        },

    }
}
</script>