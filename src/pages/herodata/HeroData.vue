<template>
  <div>
    <head-nav :headstyle="headstyle"></head-nav>
    <swiper-img></swiper-img>
    <hero-list
      :heroLists="heroLists"
      :selectItems = "selectItems"
    >
    </hero-list>
    <footer-info></footer-info>
  </div>
</template>

<script>
import HeadNav from '@/common/HeadNav'
import FooterInfo from '@/common/FooterInfo'
import SwiperImg from './components/SwiperImg'
import HeroList from './components/HeroList'
import axios from 'axios'
export default {
  name: 'HeroData',
  data () {
    return {
      headstyle: {
        position: 'absolute',
        background: 'rgba(0,0,0,.7)'
      },
      heroLists: [],
      selectItems: []
    }
  },
  components: {
    HeadNav,
    SwiperImg,
    HeroList,
    FooterInfo
  },
  methods: {
    getHeroData () {
      axios.get('./static/data/heroLists.json' + '?t=' + (new Date()).getTime().toString()).then(this.getDataSucc)
    },
    getDataSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        this.heroLists = res.data.heroLists
        this.selectItems = res.data.selectItems
      }
    }
  },
  mounted () {
    this.getHeroData()
  }
}
</script>

<style lang="stylus" scoped>

</style>
