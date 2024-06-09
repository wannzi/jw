<template>
   <div class="fileComparison">
      <div class="fileComparison_left">
         <span class="left_head">
            <img src="../../../assets/UserManagement/汉堡图标_hamburger.png" alt="">
            <div>文件目录</div>
         </span>

         <!-- 文件树 -->
         <el-tree :data="fileData" default-expand-all="true" node-key="label" :render-content="renderContent" :allow-drop="() => false"></el-tree>
      </div>

      <div class="fileComparison_right">
         <el-row class="right_head">
            <span class="icon_head" @click="showUpLoadPopup">
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
            <div>导入: 将本地excel文件导入到私有库</div>
            <div>导出: 将一个或多个文件导出到本地</div>
            <div>保存: 打开文件修改后保存</div>
            <div>删除: 将私有库或结果库文件删除</div>
            <div>检索: 在一个或多个文件中检索内容</div>
            <div>对比: 将一个或多个文件进行内容比对</div>
         </div>
         <!-- 弹窗 -->
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
         // publicList: [
         //    {
         //       name: '文件一',
         //       path: '',
         //       file: ''
         //    },
         //    {
         //       name: '文件二',
         //       path: '',
         //       file: ''
         //    },
         //    {
         //       name: '文件三',
         //       path: '',
         //       file: ''
         //    }
         // ],
         // privateList: [
         //    {
         //       name: '文件一',
         //       path: '',
         //       file: ''
         //    },
         //    {
         //       name: '文件二',
         //       path: '',
         //       file: ''
         //    },
         //    {
         //       name: '文件三',
         //       path: '',
         //       file: ''
         //    }
         // ],
         // resultsList: [
         //    {
         //       name: '文件一',
         //       path: '',
         //       file: ''
         //    },
         //    {
         //       name: '文件二',
         //       path: '',
         //       file: ''
         //    },
         //    {
         //       name: '文件三',
         //       path: '',
         //       file: ''
         //    }
         // ],
         publicListIsShow: false,
         privateListIsShow: false,
         resultsListIsShow: false,
         fileContent: '',
         uploadPopupIsShow: false,
         selectedFiles: [],  // 用于存储选中的文件信息
         tableData: [], // 新增用于存储表格数据
         extraRows: 3,  // 额外增加的行数
         extraColumns: 3 ,// 额外增加的列数
         
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
      // 展开文件树

      showList(nav) {
         if (nav == 1) {
            this.publicListIsShow = !this.publicListIsShow;
         } else if (nav == 2) {
            this.privateListIsShow = !this.privateListIsShow;
         } else if (nav == 3) {
            this.resultsListIsShow = !this.resultsListIsShow;
         }
      },

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
      showUpLoadPopup() {
         this.uploadPopupIsShow = true;
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

      // 预览文件
      previewFile(file) {
         this.$router.push({ name: 'FileComparison' });
         if (file.file && file.file instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
               const data = new Uint8Array(e.target.result);
               const workbook = XLSX.read(data, { type: 'array' });
               const sheetName = workbook.SheetNames[0];
               const worksheet = workbook.Sheets[sheetName];
               let rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: true });

               // 获取原始数据的最大行列数
               let maxRows = rawData.length;
               let maxCols = rawData.reduce((max, row) => Math.max(max, row.length), 0);

               // 添加额外的行和列
               this.tableData = new Array(maxRows + this.extraRows).fill([]).map((row, rowIndex) => {
                  return new Array(maxCols + this.extraColumns).fill('').map((cell, cellIndex) => {
                     if (rowIndex < rawData.length && cellIndex < rawData[rowIndex].length) {
                        return rawData[rowIndex][cellIndex] || '';  // 处理undefined或null
                     }
                     return '';
                  });
               });

               this.fileContent = this.tableData.map(row => row.join(' | ')).join('\n');  // Optional: for text preview
            };
            reader.readAsArrayBuffer(file.file);
         } else {
            console.error('传递的不是有效的文件对象');
         }
      },
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
      }
  }
}
</script>
<style>
.fileComparison {
   padding-top: 9vh;
   padding-left: 1vw;
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
   background-color: rgba(64, 149, 229, 0.2);
   /* 半透明黑色背景 */
   z-index: 1;
   /* 确保遮罩层在左侧导航内容之上 */
   pointer-events: none;
}

.fileComparison_right {
   position: relative;
   width: 83vw;
   height: 100%;
   margin-left: 1vw;
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
   background-color: rgba(64, 149, 229, 0.2);
   /* 半透明黑色背景 */
   z-index: 1;
   /* 确保遮罩层在左侧导航内容之上 */
   pointer-events: none;

}
</style>

<style scoped>
.el-tree  {
   color: white;
   background-color: transparent;
   font-size: 0.9vw;
   padding-left: 5%;
   padding-right: 5%;
}

/deep/.el-tree-node__content{
  height: 30px;
}

/deep/.el-tree-node.is-current>.el-tree-node__content{
  color: #32FFF6;
  font-weight: bold;
}

/deep/.el-tree-node__content:hover{
  background-color: #f5f7fa40;
}

</style>
<style>
.left_head {
   font-size: 1.6vw;
   color: #32FFF6;
  font-family: youshe;
   //font-weight: bold;
   //font-style: italic;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 1vw;
   margin-bottom: 1vw;
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
   line-height: 40px;
   opacity: 0.7;
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
   background-color: rgba(64, 149, 229, 0.2);
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
   margin-top: 2vw;
   margin-left: 2vw;
}
</style>

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
   z-index: 9;

}

.dialog-content {
   background: white;
   padding: 20px;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   position: relative;
   z-index: 11;
   width: 30vw;
   height: 20vh;
   border-radius: 5px;

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

.dialog-content .file-input {
   height: 40vh;
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