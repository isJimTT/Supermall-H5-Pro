<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tar-bar/>
  </div>
</template>

<script>

  import MainTarBar from './components/content/maintarbar/MainTarBar';

export default {
  name: 'App',
  components: {
    MainTarBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
