<template>
<div class="profile">
    <div class="yes" v-if="playerId !== null">
        <p>okay</p>
    </div>
    <div class="no" v-if="playerId === null">
        <p>help</p>
    </div>
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
        .then(api.GetMyProfile())
        .then(x=> this.profileString = x)
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

    },
}
</script>