<template>
<div class="diet">
<form>
    <h3>Add new Meal!</h3>
  <div class="form-group">
    <label for="diet">Exercise</label>
    <input type="text" class="form-control" id="enterdiet" placeholder="Enter food">
    <small class="form-text text-muted">Enter the food you ate.</small>
  </div>
  <button type="submit" class="btn btn-primary" @click.prevent="entermeal">Add food</button>
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
        entermeal(f) {
            api.enterMeal(f);
        }

    },
}
</script>