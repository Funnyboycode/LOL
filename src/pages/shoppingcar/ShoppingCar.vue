<template>
  <div class="shoppingCar">
    <head-nav :headstyle="headstyle"></head-nav>
    <product-list></product-list>
    <footer-info></footer-info>
  </div>
</template>

<script>
import HeadNav from '@/common/HeadNav'
import ProductList from './components/ProductList'
import FooterInfo from '@/common/FooterInfo'
export default {
  name: 'ShoppingCar',
  components: {
    HeadNav,
    ProductList,
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
