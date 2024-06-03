<template>
   <div>
      <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDropMain">

         <div v-if="!filesMain.length">
            <div class="intoFile_title_1">+</div>
            <div class="intoFile_title_2">请将主文件从目录拖拽到此</div>
         </div>



         <!-- 文件列表展示 -->
         <el-tooltip :key="tag" v-for="tag in filesMain" :content="tag.father">
            <el-tag closable :disable-transitions="false" type="success" @close="handleCloseMain(tag)">
               <img src="../../../../assets/UserManagement/文件-excel_file-excel.png" alt="" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 5px;">

               {{ tag.label }}

            </el-tag>
         </el-tooltip>

      </div>
      <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDropCompare">

         <div v-if="!filesCompare.length">
            <div class="intoFile_title_1">+</div>
            <div class="intoFile_title_2">请将比对文件从目录拖拽到此</div>
         </div>



         <!-- 文件列表展示 -->
         <el-tooltip :key="tag" v-for="tag in filesCompare" :content="tag.father">
            <el-tag closable :disable-transitions="false" type="success" @close="handleCloseCompare(tag)">
               <img src="../../../../assets/UserManagement/文件-excel_file-excel.png" alt="" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 5px;">

               {{ tag.label }}

            </el-tag>
         </el-tooltip>

      </div>

      <button class="ge_btn1">下一步</button>
   </div>
</template>
<script>
export default {
   data() {
      return {
         filesMain: [],
         filesCompare: [],
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
      handleDragOver() {

      },


      handleFileDropMain(event) {
         event.preventDefault();
         const data = event.dataTransfer.getData('application/json');
         const item = JSON.parse(data);
         this.filesMain.push(item); // 假设处理的是文件列表

      },
      handleCloseMain(tag) {
         const index = this.filesMain.indexOf(tag);
         if (index !== -1) {

            this.filesMain.splice(index, 1);
         }
      },

      handleFileDropCompare(event) {
         event.preventDefault();
         const data = event.dataTransfer.getData('application/json');
         const item = JSON.parse(data);
         this.filesCompare.push(item); // 假设处理的是文件列表

      },


      handleCloseCompare(tag) {
         const index = this.filesCompare.indexOf(tag);
         if (index !== -1) {

            this.filesCompare.splice(index, 1);
         }
      },
   }


}
</script>
<style scoped>
.el-tag {
   font-size: 18px;
   /* 添加元素时候左侧排列 */
   float: left;
   margin-top: 10px;
   margin-right: 20px;

}
::v-deep .el-tag.el-tag--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    flex-direction: column;
}

::v-deep .el-tag.el-tag--success {
    position: relative;
}
::v-deep .el-tag.el-tag--success .el-tag__close {
    position: absolute;
    transform: translate(45%, -45%);
    background-color: #67c23a;
    color: #FFF;
}
</style>
<style scoped>
.intoFile {
   height: 30vh;
   margin-top: 2vw;

}
</style>
