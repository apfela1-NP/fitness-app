<template>
<div class="profile">
    <p>{{ getmyprofile() }}</p>
</div>
</template>




<script>
import { GetMyProfile, GetState } from '@/services/api_access';
export default {
    data(){
        return {
            state: {
                users: []
            },

        }
    },
    created(){
        this.refresh();
    },
    methods: {
        refresh(){
            GetState()
            .then(x=> this.state = x)
        },
        getmyprofile(){
            GetMyProfile()
            .then(()=> this.refresh())
        }
    }
}
</script>