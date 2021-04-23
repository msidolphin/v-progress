# v-progress
vue进度条组件

## 安装

```bash
npm install @msidolphin/vue-progress
```

## 使用

```js
import Vue from 'vue'

import VueProgress from '@msidolphin/vue-progress'

Vue.use(VueProgress)
```

```vue
<script>
export default {
  name: 'App',
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
}
</script>

<template>
  <div id="app">
    <v-linear-progress
      className="hover"
      :chunks="20"
      :colors="['red', 'blue', 'orange']"
      :percent="percent"
      curve="linear"
    />
    <br/>
    <v-linear-progress
      className="hover"
      :chunks="44"
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
```
## 配置

### v-linear-progress

|  属性   | 类型  |  默认值   | 说明  |
|  ----  | ----  | ----  | ----  |
| percent | number | 0  | 进度所占比例 [0 - 1] |
| chunks  | number | 20  | 分块数量 |
| chunkGaps  | number | 1  | 分块间距 |
| chunkGaps  | number | 1  | 分块间距 |
| chunkColor  | string | rgba(0,0,0,.2) | 分块的背景色 |
| colors  | array<string> | ['#56D6C7', '#409BFF'] | 进度条背景色 |
| duration  | number | 300  | 动画时长 |
| curve  | string | easeInQuad  | 动画缓动函数 |

### 缓动函数可选值

* linear
* easeInQuad
* easeOutQuad
* easeInOutQuad
* easeInCubic
* easeOutCubic
* easeInOutCubic
* easeInQuart
* easeOutQuart
* easeInOutQuart
* easeInQuint
* easeOutQuint
* easeInOutQuint
* easeInSine
* easeOutSine
* easeInOutSine
* easeInExpo
* easeOutExpo
* easeInOutExpo
* easeInCirc
* easeOutCirc
* easeInOutCirc
* easeInElastic
* easeOutElastic
* easeInOutElastic
* easeInBack
* easeOutBack
* easeInOutBack
* easeInBounce
* easeOutBounce
* easeInOutBounce