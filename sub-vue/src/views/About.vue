<template>
  <div class="about">
    <h1>This is an about page</h1>
    <main-world></main-world>
    <button @click="clickHandle">点击看看主程序有反应不</button>
  </div>
</template>
<script>
export default {
  components: {
    // mainWorld
  },
  methods: {
    clickHandle () {
      this.$pager.next({
        from: 'sub-vue',
        token: '但若不见你，阳光也无趣'
      })
    }
  }
}
</script>
