<template>
   <div class="app">
      <div class="head">
         <div class="title">
            大数据业务研判中心
         </div>
         <!-- 右侧用户 -->
         <div class="right-user" >
            <img src="" alt="">
            <div class="username">
               <p>用户名</p>
            </div>
            <div class="operate">

            </div>
         </div>

      </div>
      <div class="childView">
         <router-view></router-view>
      </div>
   </div>
</template>
<script>
export default {
   data() {
      return {
      }
   },
   activated() {
   },
   watch: {
   },
   created() {
   },
   mounted() {
   },
   methods: {
   }


}
</script>
<style>
#app {
   background-image: url('../../assets/UserManagement/background.png');
   height: 100vh;
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   z-index: 0;

}

.head {
   position: fixed;
   background-image: url('../../assets/UserManagement/head.png');
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   height: 70px;
   width: 100%;
   color: #32fff6;
   z-index: 10;

   padding-top: 8px;
   font-size: 1.7vw;
   /* 默认字体大小 */



}

.right-user {
   position: fixed;
   top: 0;
   right: 0;
   display: flex;
   align-items: center;
   font-size: 20px;
}
.head .title {
   padding-top: 8px;



}

</style>
