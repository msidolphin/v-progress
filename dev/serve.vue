<script>
import Vue from 'vue';
import VProgress from '@/v-linear-progress.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VProgress
  }
});
</script>

<template>
  <div id="app">
    <v-progress className="hover" :chunks="44" :percent="0.8"/>
  </div>
</template>

<style scoped>
.hover:hover {
  border-color: red;
}
</style>
