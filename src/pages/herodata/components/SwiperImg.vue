<template>
  <div class="swiper" @mouseenter="closeAuto" @mouseleave="openAuto">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'SwiperImg',
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperList: [ {
        id: '001',
        imgUrl: 'https://img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_2a37c49d6e8d582e57b28020f222a14d/0'
      }, {
        id: '002',
        imgUrl: 'https://img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_45cd0969e7c2936ef4692493c43b22ae/0'
      }, {
        id: '003',
        imgUrl: 'https://img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_3eb2448679b31989cd272f19bb1dc452/0'
      }]
    }
  },
  methods: {
    openAuto () {
      this.mySwiper.autoplay.start()
    },
    closeAuto () {
      this.mySwiper.autoplay.stop()
    }
  },
  computed: {
    mySwiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="stylus" scoped>
  .swiper >>> .swiper-slide
    height: 360px;
  .swiper
    width: 100%;
    min-width: 1240px;
    overflow: hidden;
    position: relative;
    z-index: 10
    .swiper-img
      width: 100%;
      height: 100%;
      object-fit: cover;
</style>
