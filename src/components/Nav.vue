<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/about">About</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" v-if="playerId !== null" :to="{name: 'user', params: {id: playerId}}">Profile</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import * as api from '@/services/api_access';
export default {
    data(){
        return {
                playerId: null,
            state: {
                users: [],
            },
        }
    },
    created(){
        api.events.$on("playerId", x=> this.playerId = x)
    }
}
</script>
