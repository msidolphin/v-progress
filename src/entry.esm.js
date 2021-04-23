import LinearProgress from '@/v-linear-progress.vue'

export default /*#__PURE__*/(() => {
  const installable = {}

  installable.install = (Vue) => {
    Vue.component('VLinearProgress', LinearProgress)
  }
  
  return installable
})()

