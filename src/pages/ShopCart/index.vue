<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="list in cartInfoList" :key="list.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="list.isChecked"
              @change="changeChecked(list.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="list.imgUrl" />
            <div class="item-msg">{{ list.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ list.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', list)" ref="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="list.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('ipt', list, $event)"
            />
            <a class="plus" @click="handler('add', list)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ list.skuNum * list.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartSku(list.skuId)">删除</a>
            &nbsp;&nbsp;&nbsp;
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="changeAllChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteSelectedSku">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ selectedItems }}</span>
          件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a  href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  data() {
    return {
      flag: true,
    }
  },
  mounted() {
    this.getCartList()
  },
  computed: {
    ...mapGetters('cart', ['cartListSon']),
    cartInfoList() {
      return this.cartListSon.cartInfoList || []
    },
    isAllChecked() {
      return (
        this.cartInfoList.every((list) => list.isChecked) &&
        (this.cartInfoList.length == 0 ? false : true)
      )
    },
    selectedItems() {
      return this.cartInfoList.reduce(
        (pre, cur) => pre + (cur.isChecked == 1 ? 1 : 0),
        0,
      )
    },
    totalPrice() {
      return this.cartInfoList.reduce((pre, cur) => {
        let cartPrice = cur.skuPrice * cur.skuNum
        return pre + (cur.isChecked == 1 ? cartPrice : 0)
      }, 0)
    },
  },
  methods: {
    deleteSelectedSku() {
      this.$store.dispatch('cart/deleteSelectedSku')
    },
    deleteCartSku(skuId) {
      this.$store.dispatch('cart/deleteCartSku', skuId)
    },
    getCartList() {
      this.$store.dispatch('cart/getCartList')
    },
    async changeChecked(id, event) {
      try {
        let isChecked = event.target.checked ? 1 : 0
        await this.$store.dispatch('cart/changeIsChecked', { skuId: id, isChecked: isChecked })
        this.getCartList()
      } catch (error) {
        console.log(error.message)
      }
    },
    async changeAllChecked(event) {
      try {
        let isChecked = event.target.checked ? 1 : 0
      await this.$store.dispatch('cart/changeAllChecked', isChecked)
      this.getCartList()
      } catch (error) {
        console.log(error.message)
      }
      
    },
    handler(type, list, event) {
      let num
      if (this.flag) {
        this.flag = false
        switch (type) {
          case 'minus':
            console.log(list.skuNum)
            num = list.skuNum > 1 ? -1 : 0
            break
          case 'add':
            num = 1
            break
          case 'ipt':
            let iptval = event.target.value
            let regexp = new RegExp('(^[1-9][0-9]*)$')
            let result = regexp.test(iptval)
            if (result) {
              num = iptval - list.skuNum
            } else {
              event.target.value = list.skuNum
              return
            }
        }
        if (num) {
          this.$store
            .dispatch('cart/changeSkuNum', { skuId: list.skuId, skuNum: num })
            .then(
              (value) => {
                this.$store.dispatch('cart/getCartList').then(
                  value => {
                  this.flag = true
                })
              },
              (error) => {
                console.log(error.message)
              },
            )
        } else {
          let result = confirm('确定删除吗')
          if (result) {
            this.$store.dispatch('cart/deleteCartSku', list.skuId)
          } else {
            alert('已取消')
          }
          this.flag = true
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 10%;
        }

        .cart-list-con2 {
          width: 40%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 330px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 7.5px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            display: inline-block;
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
