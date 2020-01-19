<template>
  <div id="app">
    <!-- <span>123</span> -->
    <!-- <index></index> -->
    <!-- <router-view></router-view> -->
    <!-- <proof></proof> -->
    <index v-if="path=='/'"></index>
    <proof v-if="path=='/proof'"></proof>
    <proofOut v-if="path=='/proofOut'"></proofOut>
    <proofBx v-if="path=='/proofBx'"></proofBx>

    <router-view />
  </div>
</template>

<script>

import index from '@/view/home/index.vue'
import proof from '@/view/proof/index.vue'
import proofOut from '@/view/proofOut/index.vue'
import proofBx from '@/view/proofBx/index.vue'

export default {

  name: 'app',
  components: {
    index,
    proof,
    proofOut,
    proofBx,
  },
  methods: {

  },
  date () {
    return {
      path: null,
    }
  },
  created () {
    this.path = window.location.pathname
    console.log(this.path.indexOf('proof'));

  }
}
</script>

<style>
</style>
