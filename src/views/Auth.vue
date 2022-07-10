<template>
  <router-view></router-view>
  <!-- <img class="graphic-2" :src="graphic2" alt=""> -->
  <!-- <img class="graphic-2" :src="graphic2" alt=""> -->
</template>

<script>
import img from '@/assets/imgs/projections-graphic.svg'
import img2 from '@/assets/imgs/analytics-graphic.svg'

export default {
  computed: {
    graphic() { return img },
    graphic2() { return img2 }
  },
}
</script>