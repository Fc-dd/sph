<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <form>
        <h3>
          注册新用户
          <span class="go">
            我有账号，去
            <a>登陆</a>
          </span>
        </h3>
        <div class="content">
          <label for="phone">手机号:</label>
          <input type="number" placeholder="请输入你的手机号" v-model.number.lazy="phone" id="phone"
            @blur="inputBlur('phone')" />
          <span class="error-msg" v-if="phoneErr" ref="phone">

          </span>
        </div>
        <div class="content">
          <label>验证码:</label>
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <button style="width: 90px; height: 38px;" @click = "getCode">获取验证码</button>
          <!-- <span class="error-msg" v-if="isErr"></span> -->
        </div>
        <div class="content">
          <label>登录密码:</label>
          <input type="password" placeholder="请输入你的登录密码" v-model="password" autocomplete
            @blur="inputBlur('password')" />
          <span class="error-msg" v-if="passwordErr" ref="password">rrrr</span>
        </div>
        <div class="content">
          <label>确认密码:</label>
          <input type="password" placeholder="请输入确认密码" v-model="password2" autocomplete
            @blur="inputBlur('password2')" />
          <span class="error-msg" v-if="password2Err" ref="password2"></span>
        </div>
        <div class="controls">
          <input name="m1" type="checkbox" :checked="isChecked" @change="isChecked = !isChecked"/>
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">错误提示信息</span>
        </div>
        <div class="btn">
          <input type="submit" value="提交" @click.prevent="accomplishRegister">
        </div>
      </form>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { reg_tel, reg_password } from '@/utils/regexp'
export default {
  name: 'Register',
  data() {
    return {
      phoneErr: false,
      passwordErr: false,
      password2Err: false,
      phone: '',
      code: '',
      password: '',
      password2: '',
      isChecked:false
    }
  },
  methods: {
    inputBlur(type) {
      let result
      switch (type) {
        case 'phone':
          if (this.phone) {
            this.phoneErr = true
            result = reg_tel.test(this.phone)
            if (result) {
              this.$nextTick(() => {
                this.$refs.phone.innerHTML = '√'
                this.$refs.phone.style.color = 'green'
              })
            } else {
              this.$nextTick(() => {
                this.$refs.phone.innerHTML = '手机号码格式不正确请重新输入'
              })
            }
          }else{
            this.phoneErr = false
          }
          break
        case 'password':
          result = reg_password.test(this.password)
          if (this.password) {
            if (result) {
              this.passwordErr = true
              this.$nextTick(() => {
                this.$refs.password.innerHTML = '√'
                this.$refs.password.style.color = 'green'
              })
            } else {
              this.passwordErr = true
              this.$nextTick(() => {
                this.$refs.password.innerHTML = '请输入字母与数字组合的8位密码'
              })
            }
          }
          break
        case 'password2':
          if (this.password2) {
            this.password2Err = true
            if (this.password == this.password2) {
              this.$nextTick(()=>{
                this.$refs.password2.innerHTML = '√'
                this.$refs.password2.style.color = 'green'
              })
            }else{
              this.$nextTick(() => {
                this.$refs.password2.innerHTML = '两次输入的密码不一致'
              })
            }
          }else{
            this.password2Err = false
          }
      }
    },
    getCode(){
      if(this.phone){
        this.$store.dispatch('user/getCode',this.phone).then(
          value=>{
            this.code = this.$store.state.user.code
          }
        )
      }
    },
    async accomplishRegister(){
      let{phone,password,password2,isChecked,code} = this;
      let result = (phone && code && isChecked && password == password2)?true:false
      try {
        if(result){
        await this.$store.dispatch('user/userRegister',{phone,code,password})
        this.$router.push('/login')
      }
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 500px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin-bottom: 80px;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      input {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
