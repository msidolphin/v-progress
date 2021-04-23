<template>
  <div class="progress"
    :class="className" ref="wrapper">
    <div class="progress-content" ref="progress">
      <svg>
        <defs>
          <linearGradient
            :id="gradientId"
            x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              v-for="color in stopColors"
              :key="color[0]"
              :offset="`${color[0]}%`"
              :stop-color="color[1]">
            </stop>
          </linearGradient>
        </defs>
        <polyline
          :stroke-width="`${height}`"
          :stroke-dasharray="strokeDasharray"
          :stroke="chunkColor"
          :points="backgroundPoints">
        </polyline>
        <polyline
          :stroke-width="`${height}`"
          :stroke-dasharray="strokeDasharray"
          :stroke="`url(#${gradientId})`"
          :points="foreGroundPoints">
        </polyline>
      </svg>
    </div>
  </div>
</template>

<script>
import { observerDomResize, unObserverDomResize, debounce } from './util'
import { createRequestAnimtionFrame } from './request-animation-frame'
import { CURVE,
  DEFAULT_CURVE,
  DEFAULT_CHUNK_BACKGROUND,
  DEFAULT_CHUNKS,
  DEFAULT_CHUNK_GAPS,
  DEFAULT_DURATION,
  DEFAULT_COLORS
} from './constant'
const tweenFunctions = require('tween-functions')

let uid = 0
export default {
  props: {
    chunks: {
      type: Number,
      default: DEFAULT_CHUNKS
    },
    chunkGaps: {
      type: Number,
      default: DEFAULT_CHUNK_GAPS
    },
    chunkColor: {
      type: String,
      default: DEFAULT_CHUNK_BACKGROUND
    },
    /// 0 - 1
    percent: {
      type: Number,
      default: 0
    },
    colors: {
      type: Array,
      default: DEFAULT_COLORS
    },
    className: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: DEFAULT_DURATION
    },
    curve: {
      type: String,
      default: DEFAULT_CURVE,
      validator (val) {
        return CURVE.indexOf(val) !== -1
      }
    }
  },
  methods: {
    initSize() {
      this.width = this.$refs.progress.clientWidth
      this.height = this.$refs.progress.clientHeight
      this.start()
    },
    observerDom() {
      this.debounceInitSize = debounce(this.initSize, 200)
      this.observer = observerDomResize(this.$refs.wrapper, this.debounceInitSize)
      window.addEventListener('resize', this.debounceInitSize)
    },
    unObserverDom() {
      unObserverDomResize(this.observer)
      window.removeEventListener('resize', this.debounceInitSize)
    },
    start () {
      this.caf(this.rafId)
      this.startTime = new Date().getTime()
      this.startVal = this.oldVal
      this.endVal = this.percent * this.width
      this.raf(this.step)
    },
    step (timestamp) {
      let progress = timestamp - this.startTime
      let v = tweenFunctions[this.curve](progress, this.startVal, this.endVal, this.duration)
      if (progress < this.duration) {
        this.rafId = this.raf(this.step)
      } else {
        v = this.endVal
        this.caf(this.rafId)
      }
      this.value = v
      this.oldVal = this.value
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      gradientId: `vGradientId${uid++}`,
      value: 0,
      oldVal: 0
    }
  },
  computed: {
    stopColors() {
      return this.colors.map((c, i) => [(100 / (this.colors.length - 1)) * i, c])
    },
    backgroundPoints() {
      return `
        0, ${this.height / 2}
        ${this.width}, ${(this.height / 2 ) + 0.0001}
      `
    },
    foreGroundPoints() {
      return `
        0, ${this.height / 2}
        ${this.value}, ${(this.height / 2 ) + 0.0001}
      `
    },
    strokeDasharray () {
      if (this.chunks === 0) return ''
      return [(this.width - (this.chunks - 1)) / this.chunks,this.chunkGaps].join(',')
    }
  },
  watch: {
    percent: {
      immediate: false,
      handler () {
        this.start()
      }
    }
  },
  created () {
    const { raf, caf } = createRequestAnimtionFrame()
    this.raf = raf
    this.caf = caf
  },
  mounted () {
    this.observerDom()
    this.initSize()
  },
  beforeDestroy () {
    this.unObserverDom()
    this.raf = null
    this.caf = null
  }
}
</script>

<style lang="css" scoped>
.progress {
    position: relative;
    padding: 3px 4px;
    height: 16px;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.2);
}
.progress svg {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
}
.progress-content {
    position: relative;
    height: 100%;
}
</style>