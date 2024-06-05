<template>

  <div class="login-container">
    <div class="login-title"></div>
    <div class="login-form">
      <div class="login-input" style="margin-top: 15%;">
        <div class="icon icon-name"></div>
        <input class="base-input" type="text" placeholder="请输入账号" v-model="username" />
      </div>
      <div class="login-input">
        <div class="icon icon-password"></div>
        <input class="base-input" type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <!-- <input type="password" class="login-input" placeholder="请输入密码" v-model="password" /> -->
      <button class="login-button" @click="login">登入</button>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  background: url('/public/images/login/bg0.png');
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;

}


.login-title {
  background: url('/public/images/login/logintitle.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  width: 700px;
  height: 200px;

  margin-top: 3%;
  margin-bottom: 3%;

  box-sizing: border-box;


}

.login-form {
  /* 本图片比例1.94 */
  background: url('/public/images/login/logininput.png');
  background-repeat: no-repeat;

  background-size: contain;


  width: 582px;
  height: 300px;
  /* height: auto; */

  display: flex;
  flex-direction: column;

  box-sizing: border-box;

  /* padding-top: 20%; */
  /* padding-top: 20vh; */

}

.login-input {
  background: url('/public/images/login/input01.png');
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 20%;
  margin-right: 20%;

  height: 15%;

  margin-bottom: 2%;

  /* display: inline-block;
  white-space: nowrap; */
}

.icon {

  height: 50%;
  width: 7%;

  margin: 3%;

  background-size: contain !important;
  background-repeat: no-repeat !important;

  display: inline-block;

  

  
}
.icon-name {
background: url('/public/images/login/icon-name.png');
}
.icon-password {
background: url('/public/images/login/icon-password.png');
}

.base-input {
  display: inline-block;
  height: 100%;

  /* 在将元素display设置为inline-block的时候，元素即同时具有内联元素和块级元素的属性，既排列在同一行又可以设置宽高。
对于内联元素，都具有vertical-align属性，那这里就牵涉到vertical-align的默认对齐方式。 它的默认方式是baseline，基线对齐。基线指内容的下边缘 */
  vertical-align: top;
}


.login-button {
  background: url('/public/images/login/loginbtn.png');

  background-size: contain;
  background-repeat: no-repeat;

  width: 50%;
  height: 15%;

  margin-top: 3% !important;

  margin: 0 auto;
}

input::-webkit-input-placeholder {
  color: #24b8b6;
}
</style>
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 调用登录API并处理响应
    }
  }
};
</script>