<script>
import Vue from 'vue';
import VProgress from '@/v-linear-progress.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VProgress
  },
  data () {
    return {
      percent: 0.8
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.percent = Math.random()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
})
</script>

<template>
  <div id="app">
    <v-progress
      className="hover"
      :chunks="44"
      :colors="['red', 'blue', 'orange']"
      :percent="percent"
      curve="linear"
    />
    <br/>
    <v-progress
      className="hover"
      :chunks="44"
      :chunk-gaps="2"
      :percent="percent"
    />
  </div>
</template>

<style scoped>
.hover {
  width: 360px;
  height: 36px;
  border-color: #000;
}
.hover:hover {
  border-color: red;
}
</style>
