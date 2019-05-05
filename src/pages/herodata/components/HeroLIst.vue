<template>
  <div class="herolist">
    <div class="wrap">
      <div class="webnavpath">
        <div class="icon">
          <i class="iconfont">&#xe615;</i>
          <a @click="jumpHome">英雄联盟首页</a>
        </div>
        <div class="icon">
          <i class="iconfont">&#xe61e;</i>
          <a @click="refresh">英雄资料</a>
        </div>
        <div class="icon">
          <i class="iconfont">&#xe61e;</i>
          <a @click="refresh">{{pathName}}</a>
        </div>
        <div class="icon" v-show="showHeroName">
          <i class="iconfont">&#xe61e;</i>
          <a>{{heroName}}</a>
        </div>
      </div>
      <div v-show="!showdetail">
        <div class="wraplist">
          <ul class="menulist">
            <li v-for="(item,index) of listName" :key="index">
              <a
                :class="activeClass == index ? 'active':'normal'"
                @click="getItem(index, item)"
              >
                {{item}}
              </a>
            </li>
          </ul>
        </div>
        <div class="detail">
          <div class="img_list" v-show="activeClass === 0 ? true : false">
            <ul class="selectlabel">
              <li
                class="select-item"
                v-for="(item, index) of selectItems"
                :key="item.id"
                @click="selected(index, item.name)"
              >
                <span class="ring"><i :class="bgColorIdx == index ? 'active' : ''"></i></span>
                {{item.description}}
              </li>
            </ul>
            <div class="search">
              <input
              type="text"
              placeholder="请输入您要搜索的英雄名"
              class="searchinput"
              v-model="keyword"
            >
            </div>
            <!-- 条件搜索得到结果---star -->
            <ul class="imglist">
              <li
                class="imgItem"
                v-for="item of lists"
                :key="item.id"
                v-show="!isShow"
              >
                <img class="img" :src="item.imgUrl" alt="">
                <span>{{item.nickname}}</span>
                <div
                  class="bg"
                  @click="heroDetail(item.id, item.nickname, item.name)"
                >
                  查看详情
                </div>
              </li>
              <li
                v-show="showNoData"
                class="nodata"
              >
                非常抱歉，查无此英雄嗟！ 建议您输入正确的英雄称号、ID、或者英文名
              </li>
            </ul>
            <!-- 条件搜索得到结果---end -->
            <!-- 初次加载或页面刷新得到结果---star -->
            <ul class="imglist">
              <li
                class="imgItem"
                v-for="item of heroLists"
                :key="item.id"
                v-show="isShow"
              >
                <img class="img" :src="item.imgUrl" alt="">
                <span>{{item.nickname}}</span>
                <div
                  class="bg"
                  @click="heroDetail(item.id, item.nickname, item.name)"
                >
                  查看详情
                </div>
              </li>
            </ul>
            <!-- 初次加载或页面舒心得到结果---end -->
          </div>
          <div class="skill_list" v-show="activeClass === 1 ? true : false">
            这是召唤师技能介绍
          </div>
        </div>
      </div>
      <div
        v-show="showdetail"
        class="herodetail"
      >
        <div class="detail_skin">
          <ul class="bg_skins">
            <li
              class="bg_skin"
              v-for="(item, bigIndex) of bigImgUrls"
              :key="bigIndex"
              v-show="bigIndex === currentIndex ? true : false"
            >
              <img :src="item" :alt="skinNames[bigIndex]">
            </li>
          </ul>
          <div class="left_bg"></div>
          <div class="heroInfo">
            <h1>{{heroInfo.nickname}}</h1>
            <h2>{{heroInfo.name}}</h2>
            <ul class="forms">
              <li v-for="(item, index) of forms" :key="index">{{item}}</li>
            </ul>
            <ul class="heroStates">
              <li v-for="(value, key, index) in heroStates" :key="index">
                <span>{{key}}</span>
                <div class="sliver"><i :style="'width:'+ value"></i></div>
              </li>
            </ul>
            <div class="skinPrice"><s>&yen;</s><span>{{skinPrice[currentIndex]}}</span></div>
            <div class="button">
              <button @click="addShopCar" class="add" type="submit">添加购物车</button>
              <button @click="buyImmediately" class="buy" type="submit">立即购买</button>
            </div>
          </div>
          <!-- <span></span> -->
          <div class="small_img">
            <div class="skinnames">
              <span class="skinname">{{skinNames[currentIndex]}}</span>
            </div>
            <ul>
              <li
                v-for="(item, smallIndex) of smallImgUrls"
                :key="smallIndex"
                @click="showBigImg(smallIndex)"
              >
                <a
                >
                  <img :src="item" :alt="skinNames[smallIndex]">
                  <span :class="currentIndex === smallIndex ? 'active':  'normal'"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="bgStory">
          <h4>背景故事</h4>
          <div class="bgText">{{bgStory}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroList',
  inject: ['reload'],
  props: {
    selectItems: Array,
    heroLists: Array
  },
  data () {
    return {
      listName: ['英雄', '召唤师技能'],
      pathName: '英雄',
      heroName: '',
      activeClass: 0,
      bgColorIdx: 0,
      keyword: '',
      lists: [],
      timer: null,
      isShow: true,
      showNoData: false,
      showdetail: false,
      bordershow: false,
      showHeroName: false,
      heroInfo: [],
      forms: [],
      heroId: '',
      heroStates: {},
      bigImgUrls: [],
      smallImgUrls: [],
      skinNames: [],
      skinPrice: [],
      bgStory: '',
      currentIndex: 0
    }
  },
  methods: {
    jumpHome () {
      this.$router.push({path: '/'})
    },
    refresh () {
      this.reload()
    },
    getItem (index, item) {
      // 把当前点击元素的index，赋值给activeClass
      this.activeClass = index
      this.pathName = item
    },
    selected (index, name) {
      this.isShow = false
      this.bgColorIdx = index
      if (name === 'all') {
        this.lists = this.heroLists
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const result = []
        for (const i in this.heroLists) {
          if (this.heroLists[i].belong.indexOf(name) > -1) {
            result.push(this.heroLists[i])
          }
        }
        this.lists = result
      }, 100)
    },
    heroDetail (id, nickname, name) {
      this.showHeroName = true
      this.showdetail = !this.showdetail
      this.heroName = nickname + ' ' + name
      for (const i in this.heroLists) {
        if (this.heroLists[i].id === id) {
          this.heroId = id
          this.heroInfo = this.heroLists[i]
          this.bigImgUrls = this.heroInfo.bigImgUrl
          this.smallImgUrls = this.heroInfo.smallImgUrl
          this.skinNames = this.heroInfo.skinName
          this.forms = this.heroInfo.form
          this.heroStates = this.heroInfo.heroState
          this.bgStory = this.heroInfo.bgStory
          this.skinPrice = this.heroInfo.skinPrice
        }
      }
    },
    showBigImg (smallIndex) {
      this.currentIndex = smallIndex
    },
    addShopCar () {
      let i = this.currentIndex
      let productList = this.$store.state.productList
      var sign = true
      productList.forEach(item => {
        if (item.skinName === this.skinNames[i]) {
          this.$message({
            type: 'error',
            message: '该商品已在购物车,不可再次添加!',
            showClose: true,
            duration: 2000
          })
          sign = false
        }
      })
      if (sign) {
        let product = [{'checked': false, 'id': this.heroId, 'skinName': this.skinNames[i], 'imgUrl': this.smallImgUrls[i], 'skinPrice': this.skinPrice[i]}]
        this.$store.commit('addProduct', product)
      }
    },
    buyImmediately () {
      this.addShopCar()
    }
  },
  watch: {
    keyword () {
      this.bgColorIdx = 0
      this.isShow = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.lists = this.heroLists
        this.showNoData = false
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (const i in this.heroLists) {
          const value = this.heroLists[i]
          if (value.nickname.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1 || value.id.indexOf(this.keyword) > -1 || value.belong.indexOf(this.keyword) > -1) {
            result.push(this.heroLists[i])
          }
        }
        this.lists = result
        if (!this.lists.length) {
          this.showNoData = true
        }
      }, 100)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .herolist
    min-width: 1240px;
    background: #f7f8f8;
    line-height: 19px;
    .wrap
      width: 1240px;
      margin: 0 auto;
      .webnavpath
        width: 1240px;
        height: 96px;
        margin: 0 auto;
        text-align: left;
        line-height: 96px;
        font-size: 14px;
        .icon
          float: left;
          margin-right: 20px;
          color: #a9a9a9;
          .iconfont
            margin-right: 10px;
          a
            &:hover
              text-decoration: underline;
              cursor: pointer;
      .wraplist
        position: relative;
        border: 1px solid #e2e2e2;
        border-top: 4px solid #d7d7d7;
        height: 48px;
        background: #f0f0f0;
        .menulist
          position: absolute;
          margin-top: -4px;
          margin-bottom: -2px;
          height: 53px;
          li
            float: left;
            font-size: 16px;
            cursor: pointer;
            width: 160px;
            .normal
              display: block;
              border-top: 4px solid #d7d7d7;
              color: #000;
              height: 49px;
              line-height: 48px;
              width: 160px;
              text-align: center;
              &:hover
                border-top: 4px solid rgb(0, 163, 131);
            .active
              display: block;
              border-top: 4px solid #00a383;
              color: #00a383;
              background: #fff;
              height: 49px;
              line-height: 48px;
              width: 160px;
              text-align: center;
      .detail
        position: relative;
        min-height: 500px;
        padding: 30px 37px 30px 30px;
        margin-top: -1px;
        background: #fff;
        border: 1px solid #e1e1e1;
        border-top: none;
        .selectlabel
          float: left;
          width: 70%;
          .select-item
            float: left;
            min-width: 60px;
            margin-right: 17px;
            position: relative
            cursor: pointer;
            .ring
              display: inline-block;
              position: relative;
              top: 3px;
              margin-right: 3px;
              width: 14px;
              height: 14px;
              border: 1px solid #b1b1b1;
              border-radius: 10px;
              cursor: pointer;
              i
                display: inline-block;
                position: absolute;
                top: 2px;
                left: 2px;
                height: 10px;
                width: 10px;
                border-radius: 10px;
                background: #fff;
              .active
                background: #00a383;
        .search
          float: right;
          width: 25%;
          height: 40px;
          padding: 0 10px 0 10px;
          background: #fff;
          border: 1px solid #cdcdcd;
          box-shadow: -1px 0 3px rgba(0,0,0,.1) inset;
          .searchinput
            float: left;
            margin-top: 10px;
            height: 20px;
            line-height: 20px;
            border: 0;
            border-right: 1px solid #e5e5e5;
            color: #999;
            width: 85%;
        .imglist
          float: left;
          padding: 30px 0 0;
          position: relative;
          .imgItem
            float: left;
            position: relative;
            width: 90px;
            height: 100px;
            margin-bottom: 22px;
            text-align: center;
            line-height: 15px;
            color: #666;
            cursor: pointer;
            overflow: hidden;
            &:hover
              color: #00a383;
              .bg
                display: block;
            .img
              display: block;
              width:66px;
              height: 66px;
              border: 0;
              margin: 0 auto 10px;
            .bg
              position: absolute;
              display: none;
              height: 66px;
              line-height: 66px;
              text-align: center;
              color #fff;
              width:66px;
              top: 0;
              left: 12px;
              background: #00a383;
              opacity: .8;
          .nodata
            position: relative;
            width: 100%;
            line-height: 15px;
            margin: 20px 0 0 20px;
            color: red;
            font-size: 14px;
      .herodetail
        width: 100%;
        min-height: 500px;
        .detail_skin
          position: relative;
          width: 100%;
          height:632px;
          overflow: hidden;
          .bg_skins
            .bg_skin
              img
                width: 1240px;
                height: 632px;
          .left_bg
            position: absolute;
            top: 0;
            left: 0;
            width: 305px;
            height: 100%;
            z-index: 2;
            background: #000;
            opacity: .6;
          .heroInfo
            position: absolute;
            top: 50px;
            left: 40px;
            width: 290px;
            color: #fff;
            z-index: 3;
            h1
              font-size: 24px;
              line-height: 25px;
              padding-bottom: 25px;
              font-weight: 400;
            h2
              font-size: 42px;
              padding-bottom: 30px;
            .forms
              overflow: hidden;
              zoom: 1
              li
                float: left;
                width: 35px;
                height: 21px;
                line-height: 21px;
                margin-right: 5px;
                text-align: center;
                background: #00a483;
                border-radius: 5px;
            .heroStates
              margin-top: 25px;
              width: 150px;
              li
                overflow: hidden;
                zoom: 1;
                span
                  float: left;
                  width: 40%;
                  margin-bottom: 5px;
                  height: 16px;
                  line-height: 16px;
                .sliver
                  float: left;
                  width: 60%;
                  margin: 2px 0 7px;
                  height: 12px;
                  background: #363c3c;
                  i
                    display: block;
                    height: 12px;
                    background-color: blue;
            .skinPrice
              color: #E4393C;
              font-family: "microsoft yahei";
              margin: 30px 0 10px 20px;
              s
                font-size: 30px;
              span
                margin-left: 10px;
                font-size: 50px;
            .button
              button
                width: 200px;
                height: 40px;
                margin-top: 25px;
                line-height: 40px;
                padding: 0 26px;
                font-size: 18px;
                font-weight: 700;
                background-color: #df3033;
                color: #fff;
                border: 0;
                border-radius: 10px;
                cursor: pointer;
          .small_img
            position: absolute;
            right: 10px;
            bottom: 10px;
            .skinnames
              padding-bottom: 10px;
              text-align: right;
              .skinname
                padding: 0 5px;
                background-color: #000;
                font-size: 20px;
                line-height: 25px;
                color: #fff;
            li
              float: left;
              a
                position: relative;
                display: block;
                width: 60px;
                height: 60px;
                overflow: hidden;
                cursor: pointer;
                &:hover
                  img
                    opacity: 1;
                img
                  opacity: .7;
                span
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 52px;
                  height: 52px;
                  border: 4px solid #00a483;
                .normal
                  display: none;
                .active
                  display: block;
      .bgStory
        width: 100%;
        padding-bottom: 20px;
        h4
          margin: 45px 0 15px;
          font-size: 16px;
          color: #338c7a;
        .bgText
          min-height: 100px;
          padding: 28px 32px;
          font-size: 14px;
          line-height: 24px;
          text-indent: 32px;
          border: 1px solid #e1e1e1;
          box-shadow: 0 0 2px rgba(0,0,0,.1);
          background: #fff;
</style>
