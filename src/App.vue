<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Head from 'components/common/Head'

export default {
  name: 'app',
  components: {
    Head
  }
}
</script>
<style lang="stylus">
#app 
  height 100%
</style>
