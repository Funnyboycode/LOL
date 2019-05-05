<template>
  <div class="wrap">
    <div class="shoppingCar">
      <div class="productList">
        <div class="log">
          <img src="https://ossweb-img.qq.com/images/lol/v3/logo.png" alt="">
          <span>购物车</span>
        </div>
        <div class="productInfo" v-if="products.length">
          <div class="infoHead">
            <div class="checkAll" @click="checkAll">
              <input
                type="checkbox"
                name=""
                id="checkAll"
                v-model="checkall"
              >
              <label for="checkAll">全选</label>
            </div>
            <div class="product">商品</div>
            <div class="price">单价</div>
            <div class="operation">操作</div>
          </div>
          <div class="itemList" v-for="(item, index) in products" :key="index">
            <input
              type="checkbox"
              name=""
              id="index"
              class="checkBox"
              @click="select(item.skinName,index)"
              v-model="item.checked"
            >
            <div class="detailProduct">
              <img class="skinImg" :src="item.imgUrl" alt="">
              <h2 class="skinName">{{item.skinName}}</h2>
            </div>
            <div class="skinPrice"><span>&yen;</span>{{item.skinPrice}}</div>
            <div @click="deleteProduct(item.skinName)" class="delete">删除</div>
          </div>
          <div class="total">
            已选商品有<a>{{count}}</a>件,总价<a>¥{{price}}</a>
            <button @click="settleAccounts" type="submit">结算</button>
          </div>
        </div>
        <div class="noProduct" v-else>购物车空空如也,快去<a @click="choosePro">选购商品</a>!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data () {
    return {
      checkall: false,
      count: 0,
      price: 0,
      checkArr: []
    }
  },
  computed: {
    products () {
      return this.$store.state.productList
    }
  },
  methods: {
    deleteProduct (skinName) {
      this.$confirm('是否确定从购物车删除该商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('deleteProduct', skinName)
      })
    },
    // 复选框逻辑
    checkAll () {
      var len = this.products.length
      if (this.checkall) {
        this.price = 0
        this.count = 0
        this.checkArr = []
        for (let i = 0; i < len; i++) {
          this.products[i].checked = false
        }
      } else {
        this.price = 0
        this.count = 0
        this.checkArr = []
        this.products.forEach(item => {
          this.price += item.skinPrice
          this.count++
          this.checkArr.push(item.skinName)
          item.checked = true
        })
      }
      this.checkall = !this.checkall
    },
    // 单选框逻辑
    select (skinName, index) {
      if (this.checkall) {
        let product = this.products[index]
        this.price -= product.skinPrice
        this.count--
        for (var i in this.checkArr) {
          if (this.checkArr[i] === skinName) {
            this.checkArr.splice(i, 1)
          }
        }
      } else {
        let product = this.products[index]
        if (product.checked) {
          this.price -= product.skinPrice
          this.count--
          for (var j in this.checkArr) {
            if (this.checkArr[j] === skinName) {
              this.checkArr.splice(j, 1)
            }
          }
        } else {
          this.price += product.skinPrice
          this.count++
          this.checkArr.push(skinName)
        }
        product.checked = !product.checked
      }
      if (this.checkArr.length === this.products.length) {
        this.checkall = true
      } else {
        this.checkall = false
      }
    },
    // 结算
    settleAccounts () {
      this.$store.commit('removeProduct', this.checkArr)
      this.checkArr = []
      this.price = 0
      this.count = 0
    },
    choosePro () {
      this.$router.push({path: './HeroData'})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrap
    min-width: 1240px;
    .shoppingCar
      position: relative;
      width: 1240px;
      margin: 0 auto;
      padding: 20px 0;
      .productList
        min-height: 500px;
        .log
          position: relative;
          span
            position: absolute;
            bottom: 0;
            margin-left: 20px;
            font-family: Georgia, serif;
            font-size: 30px;
            font-weight: 900;
            color: red;
        .noProduct
          font-size: 20px;
          text-align: center;
          line-height: 500px;
          a
            color: red
            cursor: pointer;
        .productInfo
          margin-top: 40px;
          .infoHead
            position: relative;
            display: block;
            height: 32px;
            line-height: 32px;
            margin: 0 0 30px;
            padding: 5px 10px;
            background: #f3f3f3;
            border: 1px solid #e9e9e9;
            border-top: 0;
            .checkAll, .price, .operation
              float: left;
              width:20%;
              height:100%;
              #checkAll
                position: relative;
                top: 3px;
            .product
              float: left;
              width: 40%;
              height: 100%;
          .itemList
            display: flex;
            align-items : center;
            padding: 10px ;
            margin-bottom: 10px;
            border-style: solid;
            border-width: 2px 1px 1px;
            border-color: #aaa #f1f1f1 #f1f1f1;
            background: #fff;
            overflow hidden;
            .checkBox
              position relative;
              float: left
              width: 10%;
              left: -50px;
            .detailProduct
              float: left;
              width: 50%;
              .skinImg
                float: left;
                width: 60px;
                height: 60px;
              .skinName
                float: left;
                line-height: 60px;
                margin-left: 40px;
                color: seagreen;
            .skinPrice
              float: left;
              width: 20%;
              color: red;
              font-size: 20px;
              span
                font-size: 25px;
                margin-right: 10px;
            .delete
              float: left;
              width: 20%;
              &:hover
                color: red;
                cursor: pointer;
          .total
            position: absolute;
            right: 40px;
            bottom: 10px;
            color: #999;
            font-size: 15px;
            a
              color: red;
              font-size: 18px;
            button
              width: 52px;
              height: 30px;
              margin-left: 20px;
              border: 0;
              background: red;
              color: #fff;
              cursor: pointer;
</style>
