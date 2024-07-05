<template>
   <div class="app">
      <div class="U_head">

         <el-row>
            <el-button type="primary" size="medium" @click="showUploadFile()">上传文件</el-button>
            <el-button type="danger" size="medium" @click="showDeleteFile()">删除文件</el-button>
      
         </el-row>

         <div class="right">
            <el-input v-model="input" placeholder="请输入关键词搜索" size="medium"></el-input>
            <el-button type="primary" icon="el-icon-search" size="medium"></el-button>
     
         </div>
      </div>

      <!-- 表格 -->

      <el-table :header-cell-style="() => 'background:#409EFF20'" ref="multipleTable" :data="files" border stripe
         size="medium" fit style="width: 90%" class="main_table" @selection-change="handleSelectionChange">
         <el-table-column type="selection" align="center" width="100" reserve-selection
            label-class-name="custom-header-c olor">
         </el-table-column>
         <el-table-column prop="fileName" label="文件名称" :height="20" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="fileType" label="文件类型" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="uploadUser" label="上传者" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="uploadTime" label="上传时间" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="isRead" label="页面内可见" align="center" label-class-name="custom-header-color"
            v-slot="{ row }">
            <el-switch v-model="row.status" @change="changeIsRead(row)" active-color="#13ce66"></el-switch>
         </el-table-column>

         <el-table-column label="操作" width="200" align="center" label-class-name="custom-header-color" v-slot="{ row }">

            <el-button type="danger" size="small" @click="showDeleteFile(row)">删除</el-button>

         </el-table-column>
      </el-table>


      <!-- 添加分页按钮 -->
      <el-pagination background layout="prev, pager, next" :total="50" class="page">
      </el-pagination>


      <!-- 上传文件弹窗 -->

      <el-dialog :visible.sync="uploadVisible" title="上传文件" :modal-append-to-body="false" width="40%">
         <el-upload class="upload-demo" drag :before-upload="uploadFile" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">请上传xls/xlsx/sql文件</div>
         </el-upload>
      </el-dialog>



      <!-- 删除文件弹窗 -->
      <el-dialog :visible.sync="deleteVisible" title="删除文件" :modal-append-to-body="false" :before-close="handleClose"
         width="40%">
         <el-alert :title="selectedUsers.length > 1 ? '确定删除选中的用户吗？' : '确定删除该用户吗？'" type="warning" center
            :closable="false">
         </el-alert>
         <el-table :data="selectedUsers" style="width: 100%" border fit size="small">
            <el-table-column prop="fileName" label="文件名称" align="center"></el-table-column>
            <el-table-column prop="fileType" label="文件类型" align="center"></el-table-column>
            <el-table-column prop="uploadUser" label="上传者" align="center"></el-table-column>
            <el-table-column prop="uploadTime" label="上传时间" align="center"></el-table-column>
         </el-table>
         <div style="margin-top: 20px;">
            <el-button @click="deleteVisible = false">取消</el-button>
            <el-button type="primary" @click="deleteFile">确定</el-button>
         </div>
      </el-dialog>

   </div>
</template>
<script>
import { delFile, getFileList, swichFileStatus, uploadFile } from '@/api/userManagement/index.js';

export default {
   name: 'UserManagement',
   data() {
      return {
         // 表格数据
         files: [
            { fileId:"1", fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"2", fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"3", fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"4", fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"4", fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"4",  fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"4",  fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"4",  fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"4",  fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileId:"4",  fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
         ],
         //当前页码
         currentPage: 2,
         pageSize: 10,
         totalPages: 5,
         totalEntries: 0,

         //弹窗控制
         uploadVisible: false, // 上传文件弹窗
         deleteVisible: false, // 删除文件弹窗
         selectedUsers: [], // 批量删除的用户
         input: '',

      };
   },
   created() {
   },
   methods: {
      showUploadFile() {
         this.uploadVisible = true;
      },
      showDeleteFile(file = null) {
         if (file) {
            // 单个用户删除
            this.selectedUsers = [file];
            this.deleteVisible = true;
         } else {
            // 批量删除
            if (this.selectedUsers.length > 0) {
               this.deleteVisible = true;
            } else {
               this.$message({
                  message: "请选择要删除的用户",
                  type: "warning"
               });
            }
         }
      },


      handleSelectionChange(selected) {
         this.selectedUsers = selected; // 更新 selectedUsers 数组
      },
      //获取表格数据
      async getTableData() {
         const res = await getFileList();
         if (res.code === 200) {
            this.files = res.data.list;
            this.totalEntries = res.data.total;
            this.totalPages = Math.ceil(this.totalEntries / this.pageSize);
         } else {
            this.$message.error(res.msg);
         }
      
      },
      //删除操作接口
      async deleteFile() {
         console.log(this.selectedUsers);
         const fileId = this.selectedUsers.map(item => item.fileId);
         console.log(fileId);
         const res = await delFile(fileId);
         if (res.code === 200) {
            this.$message.success('删除成功');
            this.deleteVisible = false;
            this.selectedUsers = [];
            this.getTableData();
         } else {
            this.$message.error(res.msg);
         }
      
      },
      //上传文件接口
      /* eslint-disable no-unused-vars */
      async uploadFile(file) {
         const fileType  = file.type;
         const fileName = file.name;
         
         console.log(fileName,fileType,file);
         const userId = this.$store.getters.userId;
         const res = await uploadFile(userId,file);
         if (res.code === 200) {
            this.$message.success('上传成功');
            this.uploadVisible = false;
            this.getTableData();
         } else {
            this.$message.error(res.msg);
         }
      

      },
      //修改页面内是否可见接口
      async changeIsRead(row) {
            console.log(row.fileId,row.status);
            const res = await swichFileStatus(row.fileId,row.status);
            if (res.code === 200) {
               this.$message.success('修改成功');
               this.getTableData();
            } else {
               this.$message.error(res.msg);
            }
      
      },
      //搜索接口
      searchApi() {

      },


   },
   computed: {


   }
}
</script>

<style scoped>
::v-deep .el-table--medium .el-table__cell {
   padding: 8px 0;
}
</style>
