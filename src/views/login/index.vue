<template>
  <el-container width="1280px" class="_login" style="">
    <!-- <el-aside width="50%"> -->
      <div style="float:left;    width: 50%;" class="left _imgbg por" :id="sceneId" width="50%">
        <div class="_logo poa">
          <img src="@/assets/images/login/logo.png" alt="加载异常，请刷新页面">
        </div>
        <div class="_slogan poa" data-depth="0.00" style="z-index: 2">
          <img src="@/assets/images/login/slogan.png" alt="加载异常，请刷新页面">
        </div>
        <div class="_suspension poa" data-depth="0.35">
          <img src="@/assets/images/login/suspension.png" alt="加载异常，请刷新页面">
        </div>
      </div>
    <!-- </el-aside> -->
    <div width="50%" style="position:relative;float:right;    width: 50%;">
      <div class="login-container">
        <div class="login-form" v-on:mouseenter="toggleParallax('disable')" v-on:mouseleave="toggleParallax('enable')">
          <el-form  autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="_welcome">欢迎登录车商通SCRM</div>
            <p style="margin-bottom: 40px;">
              4S店客户价值提升专家
            </p>
            <div style="margin-bottom: 15px;">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
            </div>
            <div style="margin-bottom: 15px;">
              <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                placeholder="密码"></el-input>
            </div>
            <div style="margin-bottom: 15px;">
              <!-- `checked` 为 true 或 false -->
              <el-checkbox v-model="checked">记住用户名</el-checkbox>
            </div>
            <div style="margin-bottom: 15px;">
              <el-button type="primary" style="width:100%;height: 46px;" :loading="loading" @click.native.prevent="handleLogin">
                登录
            </el-button>
            </div>
            <div class="form-tips">
              <p class="right" style="float: right;">
                <a ui-sref="signup">立即注册</a> <span style="margin: 0 15px; color: #a1a1a1;">|</span> <a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4008591730&aty=0&a=0&curl=&ty=1">联系客服</a>
              </p>
            </div>
            <div class="center-h">&copy;
              版权所有 : 驱动新媒体（
              <a target="_blank" href="//www.chexiu.cn">
                www.chexiu.cn
              </a>
              ）
            </div>
          </el-form>
        </div>

      </div>
    </div>
  </el-container>

</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import Parallax from 'parallax-js'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      checked: false,
      parallax: null,
      sceneId: ''
    }
  },
  mounted(){
    this.sceneId = 'scene' + Date.now();
    this.doParallax();
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 登录样式 加入横向视觉差功能
    doParallax(){
      setTimeout(()=>{
        // console.log('执行视觉差插件');
        let parallax = this.parallax = new Parallax(document.getElementById(this.sceneId));
      },0);
    },
    toggleParallax(action){ // 鼠标移入时暂停视觉动画，移出显示
      console.log(action)
      if(this.parallax){
        this.parallax[action]();
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 46px;
    // width: 85%;
    input {
      /* background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray; */
      height: 47px;
      /* &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      } */
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
._imgbg {
  width: 100%;
  height: 100%;
  min-height: 700px;
}
._imgbg div {
  width: 100%;
  // height: 100vh;
  /* min-height: 100%;
  position: absolute;
  overflow: hidden; */
  width: 200%;
  height: 100vh;
  min-height: 100%;
  position: absolute;
  overflow: hidden;
}
._imgbg {
  ._logo img{
    width: 118px;
    height: 48px;
    left: 40px;
    top: 30px;
  }
  ._slogan img{
    width: 370px;
    height: 159px;
    left: 8%;
    margin-top: -70px;
    top: 42%;
    @media screen and (min-width: 1580px){
			left: 16%;
    }
  }
  ._suspension img{
    top: 10%;
    left: 1%;
    max-width: 1180px;
    height: auto;
    @media screen and (min-width: 1580px){
			left: 8%;
    }
  }

  img {
        position: absolute;
  }
}

._login{
  min-width:1280px;
  height: 100%;
  background-color:#0f172f;
  overflow: hidden;
  background-image: url('/src/assets/images/login/BG.png');
  opacity: 1;
  min-height: 700px;
}
.login-container {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 99999;
  // background-color: $bg;
  .login-form {
    position: absolute;
    height: 514px;
    width: 490px;
    left: 42%;
    top: 48%;
    margin: -245px 0 0 -267px;
    padding: 55px 40px 12px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #f4f6f9;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    ._welcome {
      font-weight: 700;
      font-size: 31px;
      color: #1b1b1b;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      color: #666;
    }
    .form-tips a {
      color: #999 !important;
      font-size: 12px;
    }
    .center-h{
      font-size: 12px;
      text-align: center;
      position: absolute;
      bottom: 12px;
      left: 0;
      width: 100%;
      color: #90999f;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
