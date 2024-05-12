<template>
   <div class='app'>
      <div class="head">
         <div class="title">
            大数据中心研判业务
         </div>

         <!-- 右侧用户 -->
         <div class="right-user">
            <img src="" alt="">
            <div class="username">
               <p>用户名</p>
            </div>
            <div class="operate">
               
            </div>
         </div>
      </div>

      <!-- 左侧导航 -->
      <div class="left-nav">
         <div class="nav-title">
            <button @click="navChange(1)" :class="{ btnChange: $route.name === 'UserManagement'}" >用户管理</button>
            <button @click="navChange(2)" :class="{ btnChange: $route.name === 'PermissionManagement'}" >权限管理</button>
            <button @click="navChange(3)" :class="{ btnChange: $route.name === 'FileManagement'}" >库文件管理</button>
            <button @click="navChange(4)" :class="{ btnChange: $route.name === 'RuleManagement'}" >规则管理</button>
         </div>
      </div>

      <!-- 右侧内容 -->
      <div class="right-content">
         <router-view></router-view>
      </div>

   </div>
</template>
<script >


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
      navChange(nav) {
         if ( nav === 1 ) {
            this.$router.push({name: 'UserManagement'});
         }else if ( nav === 2 ) {
            this.$router.push({name: 'PermissionManagement'});
         }else if ( nav === 3 ) {
            this.$router.push({name: 'FileManagement'});
         }else if ( nav === 4 ) {
            this.$router.push({name: 'RuleManagement'});
         }
         
         
      }
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

button {
   border-radius:4px;
}

.head {
   /* display: flex; */
   
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
   font-size: 30px; /* 默认字体大小 */

   

}

.head .title {
   padding-top: 8px;
  

  
}


.right-user {
   position: fixed;
   top: 0;
   right: 0;
   display: flex;
   align-items: center;
   font-size: 20px;
}

.left-nav {
   width: 10%;
   height: 100%;
   
   position: fixed;
   top: 0;
   z-index: 5;
   
   
}
.left-nav .nav-title {
   position: relative;
   padding-top: 12vh;
   z-index: 4;
   
}
.left-nav button {
   width: 140px;
   height:43px;
   margin-bottom: 39px;
   color: #b4fdff;
   background-color: #075a9a;
   border: 1px;
   display: block;
   margin-left: 15%;
}
.btnChange {
   border:2px solid white;
}

.left-nav::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   width: 100%; /* 遮罩层宽度与左侧导航相同 */
   height: 100%; /* 遮罩层高度与左侧导航相同 */
   background-color: rgba(166, 157, 157, 0.1); /* 半透明黑色背景 */
   z-index: 1; /* 确保遮罩层在左侧导航内容之上 */
   /* pointer-events: none; */
}

</style>

<style>
   .right-content {
      padding-top: 90px;
      position: fixed;
      top: 0;
      right: 0px;
      z-index: 8;
      width: 88%;
      height: 100%;
      
   }
   .right-content::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(166, 157, 157, 0.1);
      z-index: 1;
      pointer-events: none;
   }
</style>

<style>
   .btnChange {
      border: 2px solid white !important;
   }
</style>

<style>

.main_table {
    margin-left: 69px;
    width: 90%;
    background-color: #ffffff;
    margin-top: 30px;
    border-collapse: collapse;
    /* 移除单元格之间的间距 */
 }
 
 .main_table th {
    border: 1px solid #c7bdbd;
    padding: none;
    color: #4095e5;
    width: 60px;
    height: 45px;
 }


 
 
 
 .main_table td {
    width: 60px;
    height: 55px;
    border: 1px solid #c7bdbd;
 }
</style>
