<template>
  <div id="app">
    <Nav />
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
import '@/services/facebook';

export default {
  name: 'home',
  components: {
    Nav
  }
}
</script>

