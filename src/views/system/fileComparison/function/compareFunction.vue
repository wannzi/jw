<template>
   <div>
      <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDropMain">

         <div v-if="!filesMain.length">
            <div class="intoFile_title_1">+</div>
            <div class="intoFile_title_2">请将文件从目录拖拽到此</div>
         </div>



         <!-- 文件列表展示 -->
         <el-tooltip :key="tag" v-for="tag in filesMain" :content="tag.father + '/' + tag.label">
            <el-tag closable :disable-transitions="false" type="success" @close="handleCloseMain(tag)">
               <img src="../../../../assets/UserManagement/文件-excel_file-excel.png" alt=""
                  style="width: 50px; height: 50px; vertical-align: middle; margin-right: 5px;">

               {{ formatLabel(tag.label) }}

            </el-tag>
         </el-tooltip>

      </div>


      <el-button type="primary" @click="handleCompare">下一步</el-button>


   </div>
</template>
<script>
export default {
   data() {
      return {
         filesMain: [],

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
      formatLabel(label) {
         if (label.length > 6) {
            return label.substring(0, 5) + '...'; // 截取前10个字符并添加省略号
         }
         return label; // 如果不超过10个字符，直接返回原文本
      },
      handleDragOver() {

      },


      handleFileDropMain(event) {
         event.preventDefault();
         const data = event.dataTransfer.getData('application/json');
         const item = JSON.parse(data);
         if (this.filesMain.some(file => file.id === item.id)){
            this.$message.error('请不要重复选择文件');
         }else {
            this.filesMain.push(item); 
         }
        
         
         // localStorage.setItem('filesMain', JSON.stringify(this.filesMain));

      },
      handleCloseMain(tag) {
         const index = this.filesMain.indexOf(tag);
         if (index !== -1) {

            this.filesMain.splice(index, 1);
            // localStorage.setItem('filesMain', JSON.stringify(this.filesMain));
         }
      },


      handleCompare() {
         console.log(this.filesMain);
         if (this.filesMain.length ===0) {
            this.$message.error('请选择文件');
         }else if( this.filesMain.length === 1){
            this.$message.error('请选择两个及以上文件');
         }else {
            this.$router.push({
            name: 'CompareFunction2',
            params: { filesMain: JSON.stringify(this.filesMain) }
         });
         }
        
      }
   }


}
</script>
<style scoped>
.el-tag {
   font-size: 14px;
   /* 添加元素时候左侧排列 */
   float: left;
   margin: 15px 40px 15px 0;
   width: 100px;
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
   height: 40vh;
   margin-top: 2vw;
   margin-bottom: 2vw;
}
</style>
