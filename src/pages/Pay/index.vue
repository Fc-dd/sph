<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">
            订单提交成功，请您及时付款，以便尽快为您发货~~
          </span>
        </h4>
        <div class="paymark">
          <span class="fl">
            请您在提交订单
            <em class="orange time">4小时</em>
            之内完成支付，超时订单会自动取消。订单号：
            <em>{{ payInfo.orderId }}</em>
          </span>
          <span class="fr">
            <em class="lead">应付金额：</em>
            <em class="orange money">￥{{ payInfo.totalFee }}</em>
          </span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持
            <span class="zfb">微信</span>
            支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下微信信息。</li>
        </ol>
        <h4>
          打款微信信息：（很重要，
          <span class="save">请保存！！！</span>
          ）
        </h4>
        <ul>
          <li>支付帐号：18382772505</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li class="username"><img src="./images/pay2.jpg" /></li>
            <li class="selected username"><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li
                v-for="bank in bankInfo"
                :key="bank.id"
                :class="['username', { selected: bank.active == 1 }]"
                @click="changeActive(bank.id)"
              >
                <img :src="bank.url" />
              </li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="open">
            立即支付
          </a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import store from '@/store'
export default {
  name: 'Pay',
  data() {
    return {
      bankInfo: [
        { url: './images/pay10.jpg', active: '1', id: 1 },
        { url: './images/pay11.jpg', active: '0', id: 2 },
        { url: './images/pay12.jpg', active: '0', id: 3 },
        { url: './images/pay13.jpg', active: '0', id: 4 },
        { url: './images/pay14.jpg', active: '0', id: 5 },
        { url: './images/pay15.jpg', active: '0', id: 6 },
        { url: './images/pay16.jpg', active: '0', id: 7 },
        { url: './images/pay17.jpg', active: '0', id: 8 },
        { url: './images/pay18.jpg', active: '0', id: 9 },
        { url: './images/pay19.jpg', active: '0', id: 10 },
        { url: './images/pay20.jpg', active: '0', id: 11 },
        { url: './images/pay21.jpg', active: '0', id: 12 },
        { url: './images/pay22.jpg', active: '0', id: 13 },
      ],
      orderID: '',
      payInfo: '',
      timer: null,
      code: '',
    }
  },
  mounted() {
    console.log(this.$router)
    this.payMent()
  },
  methods: {
    async open() {
      // this.payInfo.codeUrl
      // 'weixin://wxpay/bizpayurl?pr=K4wKKFdzz'
      let result = await QRCode.toDataURL(this.payInfo.codeUrl)
      this.$alert(`<img src=${result} />`, '请微信支付', {
        // 是否将 message 属性作为 HTML 片段处理 展示图片需要用到 ！！！
        dangerouslyUseHTMLString: true,
        // 确认按钮
        confirmButtonText: '支付完成',
        // 取消按钮
        cancelButtonText: '支付遇到问题',
        // 居中显示
        center: true,
        // 显示取消按钮
        showCancelButton: true,
        // 右上角的关闭
        showClose: false,
        beforeClose: (type, instance, done) => {
          // type 区分点击的是确定还是取消 cancel close
          // instance 当前组件的实例
          // done 关闭弹窗
          if (type == 'cancel') {
            clearInterval(this.timer)
            this.timer = null
            alert('请联系管理员聪哥vx:18382772505')
            done()
          } else {
            if (this.code == 200) {
              clearInterval(this.timer)
              this.timer = null
              done()
              this.$router.push('/paysuccess?code=' + this.code)
            } else {
              alert('天下没有免费的午餐')
              clearInterval(this.timer)
              this.timer = null
              done()
            }
          }
        },
        // 没有这个回调函数会报错 Uncaught (in promise) cancel
        callback: (action) => {
          // this.$message({
          //   type: 'info',
          //   message: `成功`,
          //   center: true,
          // })
        },
      })
      if (!this.timer) {
        this.timer = setInterval(async () => {
          let result = await this.$API.reqQueryPayStatus(this.payInfo.orderId)
          if (result.code == 200) {
            clearInterval(this.timer)
            this.timer = null
            this.code = result.code
            this.$message.close()
            this.$router.push('/paysuccess?code=' + this.code)
          }
        }, 500)
      }
    },
    async payMent() {
      this.orderID = localStorage.getItem('orderId')
      let result = await this.$API.reqPayment(this.orderID)
      if (result.code == 200) {
        this.payInfo = result.data
      } else {
        alert(result.message)
      }
    },
    changeActive(id) {
      this.bankInfo.forEach((b) => (b.active = 0))
      this.bankInfo.some((b) => {
        if (b.id == id) {
          b.active = 1
        }
      })
    },
  },
  beforeRouteEnter(to,from,next){
    console.log(store)
    // debugger
    if(store.state.trade.orderId){
      next()
    }else{
      // debugger
      // console.log(from,to)
      next(false)
    }
  }
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          .username {
            margin: 2px;
            display: inline-block;
            position: relative;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
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
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
