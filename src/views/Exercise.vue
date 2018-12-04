<template>
<div class="exercise">
<form>
    <h3>Add new exercise!</h3>
  <div class="form-group">
    <label for="exercise">Exercise</label>
    <input type="text" class="form-control" id="enterexercise" placeholder="Enter exercise">
    <small class="form-text text-muted">Enter the type of exercise you did.</small>
  </div>
  <div class="form-group">
    <label for="duration">Duration</label>
    <input type="text" class="form-control" id="enterduration" placeholder="Enter duration">
    <small class="form-text text-muted">Enter how long you exercised for.</small>
  </div>
  <button type="submit" class="btn btn-primary" @click="enterexercise">Add exercise</button>
</form>
</div>
</template>

<script>
import * as api from '@/services/api_access';
import * as fb from '@/services/facebook';
// eslint-disable-next-line
let loopTimer = null;

export default {
    data(){
        return {
            playerId: null,
            profileString: "",
            sharedwith: [],
            diet: [],
            exercise: [],
            state: {
                users: [],
            },

        }
    },
    created() {
        loopTimer = setInterval(this.refresh, 1000);
        api.events.$on("playerId", x=> this.playerId = x)
        
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
        enterexercise(e, d) {
            api.EnterExercise(e, d);
        }

    },
}
</script>