<template>
  <div class="home">
    <head-nav :headstyle="headstyle"></head-nav>
    <home-content></home-content>
    <footer-info></footer-info>
  </div>
</template>

<script>
import HeadNav from '@/common/HeadNav'
import FooterInfo from '@/common/FooterInfo'
import HomeContent from './components/HomeContent'
export default {
  name: 'Home',
  components: {
    HeadNav,
    HomeContent,
    FooterInfo
  },
  data () {
    return {
      headstyle: {
        position: 'relative',
        background: '#000'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
