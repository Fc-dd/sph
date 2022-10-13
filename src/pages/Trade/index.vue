<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div v-if="!userAddressList.length">
        <div
        class="address clearFix"
        v-for="address in userAddressList.slice(0, 3)"
        :key="address.id"
        @click="changeAddress(address.id)"
      >
        <span :class="['username', { selected: address.isDefault == 2 }]">
          {{ address.consignee }}
        </span>
        <p>
          <span class="s1">{{ address.userAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-show="address.isDefault == 2">默认地址</span>
        </p>
      </div>
      </div>
      <div v-if="userAddressList.length">
        <div
        class="address clearFix"
      >
        <span class="username selected">
          钱百川
        </span>
        <p>
          <span class="s1">四川省巴中市平昌县安家坝二号桥洞</span>
          <span class="s2">17628385786</span>
          <span class="s3">默认地址</span>
        </p>
      </div>
      </div>
      
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px;" @click="handler">
          货到付款
        </span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="list in detailArrayList"
          :key="list.skuId"
        >
          <li>
            <img
              :src="list.imgUrl"
              alt=""
              style="width: 100px; height: 100px;"
            />
          </li>
          <li>
            <p class="skuName">
              {{ list.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ list.orderPrice }}</h3>
          </li>
          <li>X{{ list.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model.lazy="leaveWord"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b>
            <i>{{ totalNum }}</i>
            件商品，总商品金额
          </b>
          <span>¥{{ totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:
        <span>¥{{ totalAmount }}</span>
      </div>
      <div class="receiveInfo" v-if="!userAddressList.length">
        寄送至:
        <span>{{ userDefaultAddress.userAddress }}</span>
        收货人：
        <span ref="name">{{ userDefaultAddress.consignee }}</span>
        <span>{{ userDefaultAddress.phoneNum }}</span>
      </div>
      <div class="receiveInfo" v-if="userAddressList.length">
        寄送至:
        <span>四川省巴中市平昌县安家坝二号桥洞</span>
        收货人：
        <span ref="name">钱百川</span>
        <span>17628385786</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" to="/pay" @click="sumbitOrder">
        提交订单
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      leaveWord: '',
      orderID:''
    }
  },
  mounted() {
    this.$store.dispatch('trade/getTradeInfo')
  },
  computed: {
    ...mapGetters('trade', [
      'detailArrayList',
      'userAddressList',
      'totalAmount',
    ]),
    totalNum() {
      return (
        this.detailArrayList.reduce((pre, cur) => pre + cur.skuNum, 0) || ''
      )
    },
    userDefaultAddress() {
      return this.userAddressList.find((item) => item.isDefault == 2) || {}
    },
  },
  methods: {
    changeAddress(id) {
      this.$store.commit('trade/CHANGEADDRESS', id)
    },
    handler() {
      alert('你的信誉不够 不支持此项功能')
    },
    async sumbitOrder() {
      if (this.$refs.name.innerHTML !== '') {
        let {tradeNo} = this.$store.state.trade.tradeInfo 
        let data = {
          // consignee: this.userDefaultAddress.consignee,
          // consigneeTel: this.userDefaultAddress.phoneNum,
          // deliveryAddress: this.userDefaultAddress.userAddress,
          consignee: '钱百川',
          consigneeTel: '17628385786',
          deliveryAddress: '四川省巴中市平昌县安家坝二号桥洞',
          paymentWay: 'ONLINE',
          orderComment: this.leaveWord,
          orderDetailList: this.detailArrayList,
        }
        let result = await this.$API.reqSubmitOrder(tradeNo,data)
        if(result.code == 200){
          this.orderID = result.data
          localStorage.setItem('orderId',result.data)
          this.$store.commit('trade/SETORDERID',result.data)
          this.$router.push('/pay?orderID='+this.orderID)
        }else{
          alert(result.message)
        }
      }else{
        alert('请先选择收货地址')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        border: #ddd 1px solid;
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;
          margin-bottom: 10px;
          p {
            font-size: 10;
            width: 500px;
            word-break: break-all;
            text-overflow: ellipsis; //显示为省略号
            display: -webkit-box; //对象作为伸缩盒子模型显示
            -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
            -webkit-line-clamp: 2; //显示行数## 标题文字 ##
            overflow: hidden;
            margin-bottom: 10px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px '微软雅黑';
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
