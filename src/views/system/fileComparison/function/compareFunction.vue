<template>
   <div>
      <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDropMain">

         <div v-if="!filesMain.length">
            <div class="intoFile_title_1">+</div>
            <div class="intoFile_title_2">请将主文件从目录拖拽到此</div>
         </div>



         <!-- 文件列表展示 -->
         <ul class="file-list" v-if="filesMain.length">
            <li v-for="(file, index) in filesMain" :key="index" class="file-item">
               {{ file.name }}
               <span class="delete-btn" @click="removeFileMain(index)">×</span>
            </li>
         </ul>

      </div>
      <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDropCompare">

         <div v-if="!filesCompare.length">
            <div class="intoFile_title_1">+</div>
            <div class="intoFile_title_2">请将比对文件从目录拖拽到此</div>
         </div>



         <!-- 文件列表展示 -->
         <ul class="file-list" v-if="filesCompare.length">
            <li v-for="(file, index) in filesCompare" :key="index" class="file-item">
               {{ file.name }}
               <span class="delete-btn" @click="removeFileCompare(index)">×</span>
            </li>
         </ul>

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
      handleDragOver(event) {
         event.dataTransfer.dropEffect = 'copy';  // 显示复制效果
      },


      handleFileDropMain(event) {
         event.preventDefault();
         const data = event.dataTransfer.getData('application/json');
         const item = JSON.parse(data);
         this.filesMain.push(item); // 假设处理的是文件列表

      },
      removeFileMain(index) {
         this.filesMain.splice(index, 1); // 移除指定索引的文件
      },
      handleFileDropCompare(event) {
         event.preventDefault();
         const data = event.dataTransfer.getData('application/json');
         const item = JSON.parse(data);
         this.filesCompare.push(item); // 假设处理的是文件列表

      },
      removeFileCompare(index) {
         this.filesCompare.splice(index, 1); // 移除指定索引的文件
      },
   }


}
</script>
<style scoped>
.intoFile {
   height: 30vh;
   margin-top: 2vw;

}
</style>
