<template>
  <div>
    <div class="bg"></div>
    <dialog class="dialog" :open="true">
      <div class="close">
        <a class="close-img" @click="closeLogin" title="关闭"></a>
      </div>
      <form class="login-form" id="form" role="form">
        <div class="form-group">
          <div class="text">
            账号密码登录
          </div>
          <div
            class="errorInfo"
            v-if="showError"
          >
            {{errorText}}
          </div>
        </div>
        <div class="form-group">
          <input
            v-model="userName"
            type="text"
            ref="userName"
            class="form-control"
            id="userName"
            placeholder="支持QQ号/邮箱/手机号码登录"
          >
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            ref="password"
            class="form-control"
            id="password"
            placeholder="密码"
            autocomplete="off"
          >
        </div>
        <div class="form-group-check">
          <input
            v-model="rememberPwd"
            @click="doRememberPwd($event)"
            type="checkbox"
            id="remember-pwd"
            class="remember-pwd"
          >
          <label for="remember-pwd">记住密码</label>
        </div>
        <div class="form-group">
            <button
              @click="doLogin($event)"
              id="btn"
              type="button"
              class="btn-primary"
            >
              登 录
            </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'HeadLogin',
  inject: ['reload'],
  data () {
    return {
      userName: '',
      password: '',
      rememberPwd: false,
      showError: false,
      errorText: ''
    }
  },
  created () {
    // 在页面加载时从cookie获取登录信息
    let userName = this.getCookie('userName')
    let password = Base64.decode(this.getCookie('password'))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (userName) {
      this.userName = userName
      this.password = password
      this.rememberPwd = true
    }
  },
  methods: {
    //  关闭登录窗口
    closeLogin () {
      this.reload()
    },
    // 点击记住密码
    doRememberPwd (e) {
      this.rememberPwd = !this.rememberPwd
    },
    // 点击登录按钮业务逻辑
    doLogin (e) {
      // console.log(this.rememberPwd)
      var userName = this.userName
      var password = this.password
      if (userName === '') {
        this.showError = true
        this.errorText = '你还没有输入账号！'
        this.$refs.userName.focus()
        setTimeout(() => {
          this.showError = false
        }, 3000)
      } else if (password === '') {
        this.showError = true
        this.errorText = '你还没有输入密码！'
        this.$refs.password.focus()
        setTimeout(() => {
          this.showError = false
        }, 3000)
      }
      // 关闭登录窗口
      this.closeLogin()
      // 储存登录信息
      this.setUserInfo()
      this.$store.commit('doLogined', userName)
      this.$store.commit('haveLogined', 'yes')
    },
    //  储存登录信息
    setUserInfo () {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.rememberPwd) {
        this.setCookie('userName', this.userName)
        // base64加密密码
        let password = Base64.encode(this.password)
        this.setCookie('password', password)
      } else {
        // console.log('不记住账号密码')
        this.setCookie('userName', '')
        this.setCookie('password', '')
      }
    },
    // 获取cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bg
    background-color: rgb(230, 245, 255);
    border-top: 1px solid rgb(230, 245, 255);
    position: fixed;
    height: 1197px;
    width:  100%;
    z-index: 100001;
    left: 0;
    top: 0;
    opacity: 0.7;
    display: block;
  .dialog
    height: 368px;
    width: 622px;
    border: 0px;
    padding: 0px;
    margin: -184px 0px 0px -311px;
    position: fixed;
    z-index: 100002;
    top: 50%;
    left: 50%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    .close
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      height: 30px;
      .close-img
        display: inline-block;
        cursor: pointer;
        width: 47px;
        height: 20px;
        background: url(/static/images/sprites.png)no-repeat;
        &:hover
          background: url(/static/images/sprites.png)no-repeat 0 -25px;
    .form-group
      position: relative;
      height: 55px;
      .text
        font-size: 20px;
        text-align: center;
      .errorInfo
        position: absolute;
        height: 25px;
        line-height: 25px;
        padding-left: 25px;
        background: url(/static/images/sprites.png)no-repeat 0 -50px;
        top: 30px;
        left: 0;
        color: red;
      .form-control
        width: 272px;
        padding: 10px 0 10px 10px;
      .btn-primary
        width: 100%;
        height: 40px;
        background: #86ce2f;
        border: none;
        color: #ffffff;
        font-size: 16px;
        cursor: pointer;
    .form-group-check
      height: 30px;
      .remember-pwd
        position: relative;
        top: 2px;
</style>
