<template>
  <div
    class="headnav"
    :style="{position: this.headstyle.position, background: this.headstyle.background}"
  >
      <a href="/" class="lol-img" title="英雄联盟官网">
        <img src="https://ossweb-img.qq.com/images/lol/v3/logo.png" alt="">
      </a>
      <ul class="nav">
        <li>
          <router-link to="/HeroData">
            <span class="head-nav-title">英雄资料</span>
            <span class="head-nav-subtitle">HERO DATA</span>
          </router-link>
        </li>
        <li>
          <!-- <router-link to="/Information"> -->
          <router-link to="/#">
            <span class="head-nav-title">官方资讯</span>
            <span class="head-nav-subtitle">OFFICIAL INFO</span>
          </router-link>
        </li>
        <li>
          <router-link to="/ShoppingCar">
            <span class="head-nav-title">购物车</span>
            <span class="head-nav-subtitle">SHOPPING CAR</span>
          </router-link>
        </li>
      </ul>
      <div class="login">
        <div v-show="!isLogined">
          <span class="iconfont">&#xe673;</span>
          <p class="unlogin">亲爱的召唤师，欢迎<a @click="login">登录</a></p>
        </div>
        <div v-show="isLogined">
          <span class="iconfont">&#xe673;</span>
          <p class="logined">{{this.$store.state.userName}}<a @click="logout">[注销]</a></p>
        </div>
      </div>
      <head-login v-show="showLoginWindow"></head-login>
  </div>
</template>

<script>
import HeadLogin from './HeadLogin'
export default {
  name: 'HeadNav',
  props: {
    headstyle: Object
  },
  components: {
    HeadLogin
  },
  data () {
    return {
      showLoginWindow: false
    }
  },
  computed: {
    isLogined () {
      let yesOrNo = this.$store.state.isLogined
      if (yesOrNo === 'yes') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    login () {
      this.showLoginWindow = true
    },
    logout () {
      this.$store.commit('haveLogined', 'no')
      this.showLoginWindow = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .headnav
    overflow: visible;
    width: 100%;
    // max-width: 1358px;
    // background-color: rgba(0,0,0,.7) !important;
    min-width: 1240px;
    height: 78px;
    z-index: 11
    .lol-img
      float: left;
      width: 132px;
      height: 49px;
      margin-top: 14px;
    .nav
      float: left;
      width: 60%;
      height: 78px;
      box-sizing: border-box;
      margin-left: 30px;
      padding-top: 16px;
      li
        float: left;
        width: 33.3%;
        height: 78px;
        text-align: center;
        .head-nav-title
          display: block;
          color: #fff;
          font-size: 18px;
          letter-spacing: 1px;
        .head-nav-subtitle
          display: block;
          color: #aeaeae;
          font-size: 11px;
          margin-top: -1px;
          letter-spacing: 1px;
    .login
      float: right;
      width: 244px;
      height: 78px;
      position: relative;
      top: 0;
      right: 10px;
      .iconfont
        position: absolute;
        left: 0;
        font-size: 48px
        color: blue;
        margin-top: 12px;
      .unlogin
        position: absolute;
        right: 0;
        height 100%;
        color: #fefefe;
        font-size: 16px;
        line-height: 78px;
        a
          color: #fff3d0;
          cursor: pointer;
      .logined
        position: absolute;
        left: 70px;
        height 100%;
        max-width: 135px;
        color: #cdbe91;
        font-size: 25px;
        line-height: 78px;
        overflow: hidden;
        a
          margin-left: 10px;
          font-size: 14px;
          cursor: pointer;
          vertical-align: middle;
</style>
