<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="clickHandle">传值给子应用</button>
      <div id="subapp-viewport"></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    clickHandle () {
      this.$pager.next({
        from: 'main-vue',
        token: '我是你们的基应用'
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
