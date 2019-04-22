<template>
  <div class="home">
    <head-nav @change="showLogin"></head-nav>
    <home-content></home-content>
    <footer-info></footer-info>
    <home-login @close="showLogin" v-show="showInterface"></home-login>
    <home-bgc v-show="showBg"></home-bgc>
  </div>
</template>

<script>
import HeadNav from '@/common/HeadNav'
import FooterInfo from '@/common/FooterInfo'
import HomeContent from './components/HomeContent'
import HomeLogin from './components/HomeLogin'
import HomeBgc from './components/HomeBgc'
export default {
  name: 'Home',
  components: {
    HeadNav,
    HomeContent,
    FooterInfo,
    HomeLogin,
    HomeBgc
  },
  data () {
    return {
      showInterface: false,
      showBg: false
    }
  },
  methods: {
    showLogin () {
      this.showInterface = !this.showInterface
      this.showBg = !this.showBg
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
