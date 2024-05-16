<template>
   <div class='app'>


      <!-- 左侧导航 -->
      <div class="left-nav">
         <div class="nav-title">
            <button @click="navChange(1)" :class="{ btnChange: $route.name === 'UserManagement' }">用户管理</button>
            <button @click="navChange(2)" :class="{ btnChange: $route.name === 'PermissionManagement' }">权限管理</button>
            <button @click="navChange(3)" :class="{ btnChange: $route.name === 'FileManagement' }">库文件管理</button>
            <button @click="navChange(4)" :class="{ btnChange: $route.name === 'RuleManagement' }">规则管理</button>
         </div>
      </div>

      <!-- 右侧内容 -->
      <div class="right-content">
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
      navChange(nav) {
         if (nav === 1) {
            this.$router.push({ name: 'UserManagement' });
         } else if (nav === 2) {
            this.$router.push({ name: 'PermissionManagement' });
         } else if (nav === 3) {
            this.$router.push({ name: 'FileManagement' });
         } else if (nav === 4) {
            this.$router.push({ name: 'RuleManagement' });
         }


      }
   }


}
</script>
<style>
.left-nav {
   width: 10vw;
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
   width: 7vw;
   height: 4.3vh;
   margin-bottom: 39px;
   color: #b4fdff;
   background-color: #075a9a;
   border: 1px;
   display: block;
   margin-left: 15%;
}

.btnChange {
   border: 2px solid white;
}

.left-nav::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   /* 遮罩层宽度与左侧导航相同 */
   height: 100%;
   /* 遮罩层高度与左侧导航相同 */
   background-color: rgba(166, 157, 157, 0.1);
   /* 半透明黑色背景 */
   z-index: 1;
   /* 确保遮罩层在左侧导航内容之上 */
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
   width: 88vw;
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
<!-- 搜索框样式 -->
<style>
.U_head .right input {
   height: 3vh;
   width: 23vh;
   background-color: transparent;
   border: 1px solid #f9e5ff;
   border-right: none;
   color: #dddbdb;
   padding-left: 10px;
}

.U_head .right input:focus {
   outline: none;
   /* border-color: #f9e5ff; */
}

.U_head .right input::placeholder {
   color: #bebebe;
}

.U_head .right {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 3vh;
   /* width: 23vh; */
}

.U_head .right button {
   border: none;
   width: 3.5vh;
   height: 3.5vh;
   display: block;
   border: none;
   padding: 0.6vh;
   overflow: hidden;
   background-color: #409eff;
   /* border-radius: none; */

}

.U_head .right button img {
   width: 100%;
   height: 100%;
   display: block;
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
   /* height: 30vh; */
   width: 80vw;
   background-color: #ffffff;
   margin-top: 30px;
   border-collapse: collapse;
   /* 移除单元格之间的间距 */
}

.main_table th {
   border: 1px solid #c7bdbd;
   padding: none;
   color: #4095e5;
   width: 8vw;
   height: 4.5vh;
}





.main_table td {
   width: 60px;
   height: 5.3vh;
   border: 1px solid #c7bdbd;
}
</style>
<!-- 弹窗 -->
<style>
.dialog-backdrop {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 11;
   
}

.dialog-content {
   background: white;
   padding: 20px;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   position: relative;
   z-index: 11;
   width: 20vw;
   border-radius: 5%;

}

.dialog-content div {
   display: flex;
   justify-content: space-around;
   align-items: baseline;
}

.dialog-content div .name {
   width: 3vw;
}

.dialog-content form input,
form select {
   width: 70%;
   padding: 10px;
   margin-top: 5px;
   margin-bottom: 15px;
   box-sizing: border-box;
   border: 1px solid #ccc;
   border-radius: 4px;
}

.dialog-content table {
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-bottom: 2vh;
}

.dialog-content  .file-input{
   height: 40vh;
}
</style>

<style>
.page {
   display: flex;
   justify-content: center;
   margin-top: 30px;
   position: absolute;
   right: 8vw;
   height: 30px;
   /* width: 300px; */

}

.page button {
   border: none;
   margin-left: 10px;
   height: 30px;
   width: 28px;
   display: block;
   border: none;
   padding: 0;
   overflow: hidden;


}

.page button img {
   padding: 0.02vw;

}

.activePage {
   background-color: #409EFF;
   /* 选中页码的背景颜色 */
   color: white;
}
</style>