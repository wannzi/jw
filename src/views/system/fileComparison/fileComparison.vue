<template>
   <div class="fileComparison">
      <div class="fileComparison_left">
         <span class="left_head">
            <img src="../../../assets/UserManagement/汉堡图标_hamburger.png" alt="">
            <div>文件目录</div>
         </span>


         <!-- 文件树 -->
         <el-tree :data="fileData" node-key="label" :highlight-current="false" :render-content="renderContent" 
            :allow-drop="() => false" 
            draggable="true">

         </el-tree>



      </div>

      <div class="fileComparison_right">

         <el-row class="right_head">
            <span class="icon_head" @click="showUpLoadView">
               <img src="../../../assets/UserManagement/传入(白)_afferent.png" alt="">
               <span>导入</span>
            </span>

            <span class="icon_head" @click="showNav(2)" :class="{ navActive: this.$route.name === 'ExportFunction' }">
               <img src="../../../assets/UserManagement/传入(白)_afferent.png" style="transform: scaleX(-1);">
               <span>导出</span>
            </span>
            <span class="icon_head " :class="{ icon_head_active: !fileContent }">
               <img src="../../../assets/UserManagement/保存_save.png">
               <span>保存</span>
            </span>
            <span class="icon_head" @click="showNav(4)" :class="{ navActive: this.$route.name === 'DeleteFunction' }">
               <img src="../../../assets/UserManagement/删除_delete.png">
               <span>删除</span>
            </span>
            <span class="icon_head" @click="showNav(5)" :class="{ navActive: this.$route.name === 'SearchFunction' }">
               <img src="../../../assets/UserManagement/查找_find.png">
               <span>检索</span>
            </span>
            <span class="icon_head" @click="showNav(6)" :class="{ navActive: this.$route.name === 'CompareFunction' }">
               <img src="../../../assets/UserManagement/对比_contrast.png">
               <span>比对</span>
            </span>
         </el-row>

         <div v-if="fileContent && this.$route.name === 'FileComparison'" class="fileContentContainer">
            <el-table :data="tableData">
               <el-table-column type="index" label="行号"></el-table-column>
               <el-table-column v-for="n in columnCount" :key="n" :label="String.fromCharCode(64 + n)">
                  <template #default="scope">
                     {{ scope.row['col' + n] }}
                  </template>
               </el-table-column>
            </el-table>
         </div>




         <div class="right_title" v-if="this.$route.name === 'FileComparison' && !fileContent">
            <div>导入:将本地excel文件导入到私有库</div>
            <div>导出:将一个或多个文件导出到本地</div>
            <div>保存:打开文件修改后保存</div>
            <div>删除:将私有库或结果库文件删除</div>
            <div>检索:在一个或多个文件中检索内容</div>
            <div>对比:将一个或多个文件进行内容比对</div>
         </div>
         <!-- 弹窗 -->

         <el-dialog title="上传文件" :visible.sync="uploadFilesVisible" width="30%">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
               <i class="el-icon-upload"></i>
               <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
               <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

         </el-dialog>
         <div v-if="uploadPopupIsShow" class="dialog-backdrop" @click.self="closePopup()">
            <div class="dialog-content" @click.stop>
               <input type="file" multiple @change="handleFileUpload">
               <ul>
                  <li v-for="file in selectedFiles" :key="file.name">
                     文件名: {{ file.name }}，大小: {{ (file.size / 1024).toFixed(2) }} KB
                  </li>
               </ul>
               <div>

                  <div>
                     <button type="button" @click="closePopup()">取消</button>
                     <button type="button" @click="uploadFiles()">导入</button>
                  </div>
               </div>


            </div>
         </div>

         <router-view class="child_view">

         </router-view>



      </div>


   </div>
</template>
<script>
import * as XLSX from 'xlsx';


export default {
   data() {
      return {
         fileData: [
            {
               label: '公共库',
               draggable: false,
               iconClass: 'el-icon-folder', // 对应 CSS class
               children: [
                  { label: '文件一', draggable: true },
                  { label: '文件二', draggable: true }
               ]
            },
            {
               label: '私有库',
               draggable: false,
               children: [
                  { label: '文件一', draggable: true },
                  { label: '文件二', draggable: true }
               ]
            },
            {
               label: '结果库',
               draggable: false,
               children: [
                  { label: '文件一', draggable: true },
                  { label: '文件二', draggable: true }
               ]
            }
         ],

         publicListIsShow: false,
         privateListIsShow: false,
         resultsListIsShow: false,
         fileContent: '',

         uploadFilesVisible: false,
         selectedFiles: [],  // 用于存储选中的文件信息
         tableData: [], // 新增用于存储表格数据
         extraRows: 3,  // 额外增加的行数
         extraColumns: 3,// 额外增加的列数

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





      // 展示导出页面
      showNav(nav) {
         if (nav == 2) {
            this.$router.push({ name: 'ExportFunction' });
         } if (nav == 4) {
            this.$router.push({ name: 'DeleteFunction' });
         } if (nav == 5) {
            this.$router.push({ name: 'SearchFunction' });
         } else if (nav == 6) {
            this.$router.push({ name: 'CompareFunction' });
         }
      },
      closePopup() {
         this.uploadPopupIsShow = false;
         this.selectedFiles = [];  // 清空旧的文件列表
      },
      // 展示上传页面
      showUpLoadView() {
         this.uploadFilesVisible = true;
      },
      // 获取文件
      handleFileUpload(event) {
         this.selectedFiles = [];  // 清空旧的文件列表
         const files = event.target.files;
         for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.selectedFiles.push({
               name: file.name,  // 获取文件名
               size: file.size,  // 获取文件大小（可选）
               file: file       // 保存文件对象
            });

         }
      },
      // 上传文件
      uploadFiles() {
         // 这里假设上传成功，将文件信息添加到publicList中
         this.fileData[1].children.push(...this.selectedFiles.map(file => ({
            label: file.name,
            path: '',
            file: file,
            draggable: true
         })));
         this.selectedFiles = [];
         this.closePopup();  // 可以选择在上传后关闭弹窗
      },
      //拖动文件
      // 拖拽文件到需要部分
      handleDragStart(event, item) {
         // 转化成json字符串，以便在drop事件中获取数据
         const itemData = JSON.stringify(item);
         event.dataTransfer.setData('application/json', itemData);
      },
      renderContent(h, { node, data }) {
         return h('div', {
            attrs: {
               draggable: data.draggable // 设置 draggable 属性
            },
            on: {
               dragstart: (event) => this.handleDragStart(event, data),
               dragover: (event) => event.preventDefault()  // 可选：添加其他拖拽相关事件
            }
         }, node.label);
      },
      handleDragDragStart(event, data) {
         if (data.draggable) {  // 只处理可拖动的节点
            const itemData = JSON.stringify(data);
            event.dataTransfer.setData('application/json', itemData);
         } else {
            event.preventDefault(); // 阻止不可拖放的节点触发拖放
         }
      },


      //渲染图标
      renderContent(h, { node, data }) {
         return (
            <div style="display: flex; align-items: center;">
               <el-icon class={node.level === 1 ? 'el-icon-folder-opened' : 'el-icon-document'} style="margin-right: 10px;"></el-icon>
               <span>{node.label}</span>
            </div>
         );
      }









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

<!-- 树组件样式 -->
<style scoped>
.el-tree>>>.el-tree-node__content:hover {
   background-color: #2969a9;
}


.el-tree>>>.el-tree-node {
   padding-top: 15px;
}

.el-tree>>>.el-tree-node:focus>.el-tree-node__content {
   background-color: transparent;
}

.el-tree {
   color: #f7f9ff;
   background-color: transparent;
   font-size: 1.1vw;
   padding-left: 20%;
   padding-right: 15%;
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

.icon_head_active {
   content: "";
   background-color: rgba(48, 42, 42, 0.849);
   /* 半透明黑色背景 */
   color: #7691af;
   z-index: 9;
   pointer-events: none;
}

.icon_head:last-child {
   border-right: none;
}
</style>
<style>
.navActive {
   color: aqua;
}

.child_view {
   margin-top: 3vw;
   margin-left: 4vw;
}
</style>


<style scoped>
.fileContentContainer {
   height: 90%;
   /* 设置预览区域的高度为固定值或百分比 */
   overflow: auto;
   /* 当内容超出容器大小时，提供滚动条 */
   background-color: #f0f0f0;
}

table {
   width: 100%;
   border-collapse: collapse;
}

th,
td {
   border: 1px solid #ccc;
   padding: 8px;
   text-align: left;
}

th {
   background-color: #f0f0f0;
   /* 浅灰色背景 */
}
</style>