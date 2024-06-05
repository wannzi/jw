<template>
   <div class="fileComparison">
      <div class="fileComparison_left">
         <span class="left_head">
            <img src="../../../assets/UserManagement/汉堡图标_hamburger.png" alt="">
            <div>文件目录</div>
         </span>

         <!-- 文件树 -->
         
         <el-tree :data="fileData" node-key="label" :highlight-current="false" :render-content="renderContent"
            :allow-drop="() => false" draggable @node-drag-start="handleDragStart">

         </el-tree>



      </div>

      <div class="fileComparison_right">

         <el-tabs @tab-click="handleClick" class="right_head" >
            <el-tab-pane label="导入" name="upload" >
               <span slot="label"><img src="../../../assets/UserManagement/传入(白)_afferent.png" alt="" v-if="uploadImg">
                  <img src="../../../assets/UserManagement/传入(绿)_afferent.png" v-else>
                  导入</span>

            </el-tab-pane>
            <el-tab-pane label="导出" name="export">
               <span slot="label"> <img src="../../../assets/UserManagement/传入(白)_afferent.png" v-if="exportImg"
                     style="transform: scaleX(-1);">
                     <img src="../../../assets/UserManagement/传入(绿)_afferent.png" style="transform: scaleX(-1);" v-else>
                     导出</span>
            </el-tab-pane>
            <el-tab-pane label="保存" name="save" :disabled="true">保存
               <span slot="label"><img src="../../../assets/UserManagement/保存_save.png" alt="" v-if="false">
                  <img src="../../../assets/UserManagement/保存(灰)_save.png" v-else>
                  保存</span>

            </el-tab-pane>
            <el-tab-pane label="删除" name="delete">
               <span slot="label"><img src="../../../assets/UserManagement/删除_delete.png" alt="" v-if="deleteImg">
                  <img src="../../../assets/UserManagement/删除(绿)_delete.png" v-else>
                  删除</span>
            </el-tab-pane>
            <el-tab-pane label="检索" name="search">
               <span slot="label"><img src="../../../assets/UserManagement/查找_find.png" alt="" v-if="searchImg">
                     <img src="../../../assets/UserManagement/查找(绿)_find.png" v-else>
                  检索</span>
            </el-tab-pane>
            <el-tab-pane label="比对" name="compare">
               <span slot="label" class="last_icon"><img src="../../../assets/UserManagement/对比_contrast.png" v-if="compareImg">
                  <img src="../../../assets/UserManagement/对比(绿)_contrast.png" v-else>
                  比对</span>
            </el-tab-pane>
         </el-tabs>



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

         <el-dialog title="上传文件" :visible.sync="uploadFilesVisible" width="30%">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
               <i class="el-icon-upload"></i>
               <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
               <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

         </el-dialog>


         <router-view class="child_view">

         </router-view>
      </div>
	</div>
</template>
<script>


export default {
   data() {
      return {
         fileData: [
            {
               label: '公共库',
               draggable: false,

               children: [
                  { label: '文件一', draggable: true, father: '公共库' },
                  { label: '文件二', draggable: true, father: '公共库' }
               ]
            },
            {
               label: '私有库',
               draggable: false,
               children: [
                  { label: '文件一', draggable: true, father: '私有库' },
                  { label: '文件二', draggable: true, father: '私有库' }
               ]
            },
            {
               label: '结果库',
               draggable: false,
               children: [
                  { label: '文件一', draggable: true, father: '结果库' },
                  { label: '文件二', draggable: true, father: '结果库' }
               ]
            }
         ],

         publicListIsShow: false,
         privateListIsShow: false,
         resultsListIsShow: false,
         fileContent: '',

         uploadFilesVisible: false,
         selectedFiles: [],  // 用于存储选中的文件信息
         //标签状态
         
         uploadImg: true,
         exportImg: true,
         deleteImg: true,
         searchImg: true,
         compareImg: true,
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
      //蠢但是好用
      handleClick(tab) {
         if (tab.name === 'upload') {
            this.showUpLoadView();
            this.uploadImg = false;
            this.exportImg = true;
            this.deleteImg = true;
            this.searchImg = true;
            this.compareImg = true;
         } else if (tab.name === 'export') {
            this.$router.push({ name: 'ExportFunction' });
            this.exportImg = false;
            this.uploadImg = true;
            this.deleteImg = true;
            this.searchImg = true;
            this.compareImg = true;
         } else if (tab.name === 'delete') {
            this.$router.push({ name: 'DeleteFunction' });
            this.deleteImg = false;
            this.uploadImg = true;
            this.exportImg = true;
            this.searchImg = true;
            this.compareImg = true;
         } else if (tab.name === 'search') {
            this.$router.push({ name: 'SearchFunction' });
            this.searchImg = false;
            this.uploadImg = true;
            this.exportImg = true;
            this.deleteImg = true;
            this.compareImg = true;
         } else if (tab.name === 'compare') {
            this.$router.push({ name: 'CompareFunction' });
            this.compareImg = false;
            this.uploadImg = true;
            this.exportImg = true;
            this.deleteImg = true;
            this.searchImg = true;
         }
      },
      
     





      // 展示上传页面
      showUpLoadView() {
         this.uploadFilesVisible = true;
      },

      // 上传文件
      uploadFiles() {
         // 这里假设上传成功
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
      handleDragStart(node, event) {
         if (node.childNodes.length === 0) {  // 只允许叶子节点被拖拽
            event.dataTransfer.setData('application/json', JSON.stringify(node.data));
            event.dataTransfer.effectAllowed = 'move';
         } else {
            event.preventDefault();  // 阻止非叶子节点的拖拽
         }
      },
      handleFileDrop(event) {
         const data = event.dataTransfer.getData('application/json');
         if (data) {
            const file = JSON.parse(data);

            this.files.push(file);
            this.dynamicTags.push(file.label);  // 确保这里使用的属性与设置的一致
            console.log('Dropped files:', this.files);
         }
      },



      //渲染图标
      renderContent(h, { node }) {
      // 决定使用哪个图标
      const iconName = node.level === 1 ? 'el-icon-folder-opened' : 'el-icon-document';

      // 渲染内容时，对二级节点添加tooltip
      if (node.level === 2) {
        return (
          <div style="display: flex; align-items: center;">
            <el-icon class={iconName} style="margin-right: 10px;"></el-icon>
            <el-tooltip class="item" content={node.label} placement="top-start" effect="dark">
              <span>{node.label}</span>
            </el-tooltip>
          </div>
        );
      } else {
        return (
          <div style="display: flex; align-items: center;">
            <el-icon class={iconName} style="margin-right: 10px;"></el-icon>
            <span>{node.label}</span>
          </div>
        );
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
   font-size: 0.9vw;
   padding-left: 5%;
   padding-right: 5%;
}

.el-tabs {
   font-size: 20px;
   height: 20px;


}

/*去下划线 */
::v-deep .el-tabs__nav-wrap::after {
   position: static !important;
}





.el-tabs>>>.el-tabs__content {
   display: none !important;
   pointer-events: none !important;
}

.el-tabs>>>span {
   display: flex;
   align-items: center;
   font-size: large;
   border-right: 3px solid white;
   padding-right: 33px;

}

.el-tabs>>>.last_icon {
   border-right: none !important;
}



.el-tabs>>>.el-tabs__item {
   line-height: 0;
   height: 0px;
   color: white;

}

.el-tabs>>>.el-tabs__item.is-disabled {
   color: #7691af;
}

.el-tabs>>>.el-tabs__item.is-active {
   color: #7af0f3;
}

/* 隐藏选中标签下方的指示条 */
.el-tabs>>>.el-tabs__active-bar {
   height: 0;
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
</style>
<style>
.right_title div {
   font-size: 1.4vw;
   color: #8498ae;
   margin-top: 0.7vw;
   margin-bottom: 0.7vw;
}

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
