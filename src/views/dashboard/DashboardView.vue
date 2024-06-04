<template>
   <div class='app'>
      <!-- 左侧导航 -->
      <div class="left-nav">
         <div class="nav-title">
            <el-button @click="navChange(1)" type="primary">用户管理</el-button>
            <el-button @click="navChange(2)" type="primary">权限管理</el-button>
            <el-button @click="navChange(3)" type="primary">库文件管理</el-button>
            <el-button @click="navChange(4)" type="primary">规则管理</el-button>
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
.U_head {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-right: 100px;
   margin-left: 69px;
   margin-top: 35px;
   width: 90%;
}

.left-nav {
   width: 12vw;
   height: 100%;
   position: fixed;
   top: 0;
   z-index: 5;
}

.left-nav .nav-title {
   position: relative;
   padding-top: 12vh;
   z-index: 4;
   display: flex;
   flex-direction: column;
   align-items: baseline;

}

.left-nav button {
   width: 9vw;
   height: 6vh;
   margin-bottom: 39px;
   //font-family: youshe;
   color: #32FFF6;
   font-size: 18px;
   letter-spacing: 2px;
   font-weight: bold;
   background-image: linear-gradient(to top, rgba(4,104,175,1), rgba(4,104,175,0.5));
   border: none;
   display: block;
   margin-left: 12%;
  border-radius: 5px;
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
   background-color: rgba(64, 149, 229, 0.2);
   /* 半透明黑色背景 */
   z-index: 1;
   /* 确保遮罩层在左侧导航内容之上 */
   /* pointer-events: none; */
}
</style>

<style>
.right-content {
   padding-top: 55px;
   position: fixed;
   top: 0;
   right: 0px;
   z-index: 8;
   width: 87vw;
   height: 100%;
}

.right-content::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(64, 149, 229, 0.2);
   z-index: -1;
   pointer-events: none;
}
</style>
<!-- 搜索框样式 -->
<style>
.U_head .right input::placeholder {
   color: #bebebe;
}

.U_head .right {
   display: flex;
   align-items: center;
   justify-content: center;
   /* height: 2vh; */
   /* width: 23vh; */
}
</style>

<style>
.btnChange {
   border: 2px solid white !important;
}
</style>

<style>
.main_table {
   margin-left: 5%;
   height: 70vh;
   /* width: 80vw; */
   /* background-color: #ffffff; */
   margin-top: 20px;
   /* border-collapse: collapse; */
   /* 移除单元格之间的间距 */
   overflow: auto;
}

.el-table {
   //min-height: 200px;
   //max-height: 800px;
}

/* 定义一个 CSS 类来改变标题颜色 */
.custom-header-color {
   color: #3994e5;
}
</style>

<style>
.page {
   display: flex;
   justify-content: center;
   margin-top: 20px;
   position: absolute;
   right: 5vw;
   height: 30px;
}
</style>