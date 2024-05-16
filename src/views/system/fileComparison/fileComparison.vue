<template>
   <div class="fileComparison">
      <div class="fileComparison_left">
         <span class="left_head">
            <img src="../../../assets/UserManagement/汉堡图标_hamburger.png" alt="">
            <div>文件目录</div>
         </span>

         <div class="left_content">
            <div class="left_content_item" @click="showPublicList">
               <img src="../../../assets/UserManagement/下(白)_down.png" alt="">
               <img src="../../../assets/UserManagement/文件夹_folder.png" alt="">
               <span>公共库</span>
            </div>
            <div v-if="publicListIsShow">
               <div class="item_list" v-for="item in publicList" :key="item" >

                  <img src="../../../assets/UserManagement/编辑文件_file.png" alt="">
                  <span>{{ item.name }}</span>
               </div>

            </div>
         </div>
         <div class="left_content">
            <div class="left_content_item" @click="showPrivateList">
               <img src="../../../assets/UserManagement/下(白)_down.png" alt="">
               <img src="../../../assets/UserManagement/文件夹_folder.png" alt="">
               <span>私有库</span>
            </div>
            <div v-if="privateListIsShow">
               <div class="item_list" v-for="item in publicList" :key="item">

                  <img src="../../../assets/UserManagement/编辑文件_file.png" alt="">
                  <span>{{ item }}</span>
               </div>

            </div>
         </div>
         <div class="left_content">
            <div class="left_content_item" @click="showResultsList">
               <img src="../../../assets/UserManagement/下(白)_down.png" alt="">
               <img src="../../../assets/UserManagement/文件夹_folder.png" alt="">
               <span>结果库</span>
            </div>
            <div v-if="resultsListIsShow">
               <div class="item_list" v-for="item in publicList" :key="item">

                  <img src="../../../assets/UserManagement/编辑文件_file.png" alt="">
                  <span>{{ item }}</span>
               </div>

            </div>
         </div>
      </div>

      <div class="fileComparison_right">

         <div class="right_head">
            <span class="icon_head">
               <img src="../../../assets/UserManagement/传入(白)_afferent.png" alt="">
               <span>导入</span>
            </span>

            <span class="icon_head" @click="showNav(2)" :class="{ navActive:this.$route.name === 'ExportFunction'}">
               <img src="../../../assets/UserManagement/传入(白)_afferent.png" style="transform: scaleX(-1);">
               <span>导出</span>
            </span>
            <span class="icon_head" @click="showNav(3)" :class="{ navActive:this.$route.name === 'SaveFunction'}">
               <img src="../../../assets/UserManagement/保存_save.png">
               <span>保存</span>
            </span>
            <span class="icon_head" @click="showNav(4)" :class="{ navActive:this.$route.name === 'DeleteFunction'}">
               <img src="../../../assets/UserManagement/删除_delete.png">
               <span>删除</span>
            </span>
            <span class="icon_head" @click="showNav(5)" :class="{ navActive:this.$route.name === 'SearchFunction'}">
               <img src="../../../assets/UserManagement/查找_find.png">
               <span>检索</span>
            </span>
            <span class="icon_head" @click="showNav(6)" :class="{ navActive:this.$route.name === 'CompareFunction'}">
               <img src="../../../assets/UserManagement/对比_contrast.png">
               <span>比对</span>
            </span>
         </div>

         <div class="right_title">
            <div>导入:将本地excel文件导入到私有库</div>
            <div>导出:将一个或多个文件导出到本地</div>
            <div>保存:打开文件修改后保存</div>
            <div>删除:将私有库或结果库文件删除</div>
            <div>检索:在一个或多个文件中检索内容</div>
            <div>对比:将一个或多个文件进行内容比对</div>
         </div>
        


         <router-view></router-view>

         

      </div>

      
   </div>
</template>
<script>



export default {
   data() {
      return {
         publicList: [
            {
               name: '文件一',
               path: ''
            },
            {
               name: '文件二',
               path: '/public/file2'
            },
            {
               name: '文件三',
               path: '/public/file2'
            }
         ],
         publicListIsShow: false,
         privateListIsShow: false,
         resultsListIsShow: false,
         fileContent: '',
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
      showPublicList() {
         this.publicListIsShow = !this.publicListIsShow;
      },
      showPrivateList() {
         this.privateListIsShow = !this.privateListIsShow;
      },
      showResultsList() {
         this.resultsListIsShow = !this.resultsListIsShow;
      },
      // 展示导出页面
      showNav(nav) {
         if(nav==2){
         this.$router.push({name:'ExportFunction'});
         }if(nav==3){
         this.$router.push({name:'SaveFunction'});
         }if(nav==4){
         this.$router.push({name:'DeleteFunction'});
         }if(nav==5){
         this.$router.push({name:'SearchFunction'});
         }else if(nav==6){
         this.$router.push({name:'CompareFunction'});
         }
      },


   }


}
</script>
<style>
.fileComparison {
   padding-top: 9vh;
   padding-left: 2vw;
   display: flex;
   flex-direction: row;
   height: 89vh;
}

.fileComparison_left {
   position: relative;
   width: 14vw;
   height: 100%;


}

.fileComparison_left::before {
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
   pointer-events: none;

}

.fileComparison_right {
   position: relative;
   width: 80vw;
   height: 100%;
   margin-left: 1.7vw;
}

.fileComparison_right::before {
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
   pointer-events: none;

}
</style>

<style>
.left_head {
   font-size: 1.4vw;
   color: #75f9fd;
   font-weight: bold;
   font-style: italic;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 1vw;
   margin-bottom: 2vw;
}

.left_head img {
   width: 2vw;
   height: 2vw;
   margin-right: 0.7vw;
}

.left_content {
   color: aliceblue;
}

.left_content_item {
   display: flex;

   align-items: center;
   margin-left: 2.5vw;
   margin-top: 0.7vw;


}

.left_content img {
   width: 1vw;
   height: 1vw;
   margin-right: 0.5vw;
}

.item_list {
   margin-top: 0.5vw;
   margin-bottom: 0.5vw;
   display: flex;
   align-items: center;
   margin-left: 4.9vw;
}
</style>
<style>
.right_title {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);



}

.right_title div {
   font-size: 1.4vw;
   color: #8498ae;
   margin-top: 0.7vw;
   margin-bottom: 0.7vw;
}

.right_head {
   display: flex;
   color: #efefef;
   /* height: 4vh; */
   padding: 0.7vw;
   font-size: 1vw;
   background-color: #1f518b94;
   box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
   cursor: pointer;
   /* 设置鼠标悬停时的光标为手指指针 */
}

.right_head img {
   width: 1.2vw;
   height: 1.2vw;
   margin-right: 0.5vw;
}

.icon_head {
   display: flex;
   align-items: center;
   padding-left: 1vw;
   padding-right: 1vw;
   border-right: 4px solid #7691af;
}

.icon_head:last-child {
   border-right: none;
}
</style>
<style>
   .navActive{
      color: aqua;
   }
   
</style>