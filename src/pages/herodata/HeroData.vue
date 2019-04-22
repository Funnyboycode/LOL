<template>
  <div>
    <head-nav></head-nav>
    <footer-info></footer-info>
  </div>
</template>

<script>
import HeadNav from '@/common/HeadNav'
import FooterInfo from '@/common/FooterInfo'
export default {
  name: 'HeroData',
  components: {
    HeadNav,
    FooterInfo
  }
}
</script>

<style lang="stylus" scoped>

</style>
