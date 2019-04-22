<template>
  <div class="content">
    <div class="content-center">
      <video class="topVid" autoplay="autoplay" loop="loop" muted="">
        <source src="//game.gtimg.cn/images/lol/v3/index/201904lpl/video.webm" type="video/webm">
        <source src="//game.gtimg.cn/images/lol/v3/index/201904lpl/video.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeContent'
}
</script>

<style lang="stylus" scoped>
  .content
    position: relative;
    width: 100%;
    max-width: 1920px;
    min-width: 1240px;
    background: url(//game.gtimg.cn/images/lol/v3/index/201904lpl/bg.jpg) no-repeat center top;
    overflow: hidden;
    height: 990px;
    margin: 0 auto;
    .content-center
      position: relative;
      width: 1000px;
      height: 990px;
      margin: 0 auto;
      background: url(//game.gtimg.cn/images/lol/v3/index/201904lpl/bgc.jpg) no-repeat center top;
      .topVid
        position: absolute;
        left: -460px;
</style>
