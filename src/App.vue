<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
#logo { height: 50px;}
</style>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue';

export default {
  name: 'home',
  components: {
    Nav
  }
}
</script>

