<template>
   <div class="app">
      <div class="U_head">
         <div class="left">
            <button class="btn1" @click="uploadFile()">上传文件</button>
            <button class="btn2" @click="prepareDeleteFile()">删除文件</button>

         </div>

         <div class="right">
            <input type="text" placeholder="请输入关键词搜索">
            <button>
               <img src="../../assets/UserManagement/搜索_search.png">
            </button>
         </div>
      </div>

      <!-- 表格 -->
      <table class="main_table">
         <tr>
            <th><input type="checkbox" @change="toggleAll()" v-model="allSelected" />全选</th>
            <th>文件名称</th>
            <th>文件类型</th>
            <th>上传者</th>
            <th>上传时间</th>
            <th>页面内可见</th>

            <th>操作</th>

         </tr>
         <tr v-for="(user, index) in users" :key="index">
            <td><input type="checkbox" v-model="user.selected" /></td>
            <td>{{ user.fileName || '' }}</td>
            <td>{{ user.fileType || '' }}</td>
            <td>{{ user.uploadUser || '' }}</td>
            <td>{{ user.uploadTime || '' }}</td>
            <td>
               <label class="switch">
                  <input type="checkbox" v-model="user.isRead" @change="toggleStatus(user)">
                  <span class="slider round"></span>
               </label>
            </td>
            <td class="file_del">

               <button class="btn2 table_btn" @click="prepareDeleteFile(user)">删除</button>

            </td>
         </tr>
      </table>
      <!-- 添加分页按钮 -->
      <div class="page">
         <button >
            <img src="../../assets/UserManagement/左_left.png" style="width: 100%; height: 100%; display: block;">
         </button>
         <button v-for="page in pages" :key="page" :class="{ activePage: page === currentPage }"
            @click="changePage(page)">
            {{ page }}
         </button>
         <button >
            <img src="../../assets/UserManagement/右_right.png" style="width: 100%; height: 100%; display: block;">
         </button>

      </div>


      <!-- 弹窗 -->
      <!-- 上传文件弹窗 -->
      <div v-if="uploadVisible" class="dialog-backdrop" @click.self="closePopup()">
         <div class="dialog-content" @click.stop>
            <form @submit.prevent="handleFileUpload">
               <div>
                  <input type="file" class="file-input" />
                  
               </div>
               <button type="submit">上传</button>
               <button type="submit" @click="closePopup()">取消</button>
            </form>
         </div>

      </div>

      <!-- 删除文件弹窗 -->

      <div v-if="deleteVisible" class="dialog-backdrop" @click.self="closePopup()">
         <div class="dialog-content" @click.stop>
            <p>确定删除所选文件？</p>
            <table>
               <div v-for="user in selectedUsers" :key="user.id">
                  <tr>
                     <td>{{ user.fileName }}</td>
                     <td>{{ user.fileType }}</td>
                     <td>{{ user.uploadUser }}</td>
                     <td>{{ user.uploadTime }}</td>
                  </tr>

               </div>

            </table>
            <button type="submit" @click="deleteFile()" >确定</button>
            <button type="button" @click="closePopup">取消</button>  
         </div>
      </div>
   </div>
</template>
<script>
export default {
   name: 'UserManagement',
   data() {
      return {
         // 表格数据
         users: [
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
            { fileName: '党员库', fileType: '数据库文件', uploadUser: '张三', uploadTime: '2021-01-01', isRead: true, selected: false },
         ],
         //当前页码
         currentPage: 2,
         pageSize: 10,
         totalPages: 5,
         totalEntries: 0,
         allSelected: false,
         //弹窗控制
         uploadVisible: false,
         deleteVisible: false,
         userToDelete: null, // 即将删除的用户
         selectedUsers: [], // 批量删除的用户


      };
   },
   created() {
   },
   methods: {
      // 更改页码
      changePage(newPage) {
         if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
         }
      },
      // 处理全选逻辑
      toggleAll() {
         if (this.allSelected) { // 检查是否已全选
            this.users.forEach(user => user.selected = true); // 全选
         } else {
            this.users.forEach(user => user.selected = false); // 全部取消选中
         }

      },
      // 弹窗部分内容
      // 上传文件
      uploadFile() {
         this.uploadVisible = true;
      },
      closePopup() {
         this.uploadVisible = false;
         this.deleteVisible = false;
      },
      // 删除文件
      prepareDeleteFile(user = null) {

         if (user) {
            // 单个用户删除
            this.selectedUsers = [user];
         } else {
            // 批量删除
            this.selectedUsers = this.users.filter(u => u.selected);
         }

         this.deleteVisible = true;
      },
      deleteFile() {
         this.selectedUsers.forEach(user => {
            const index = this.users.indexOf(user);
            if (index !== -1) {
               this.users.splice(index, 1);
            }
         });
         alert('删除成功');
         this.closePopup('popup2');
         // 清空选中的用户数组
         this.selectedUsers = [];
      }

   },
   computed: {

      // 更新页码
      pages() {
         let pages = [];
         console.log(this.totalPages);
         for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
         }
         return pages;
      }
   }
}
</script>


<style scoped>
.U_head {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-right: 100px;
   margin-left: 69px;
   margin-top: 35px;

}


.U_head .left button {
   width: 94px;
   height: 37px;
   margin-right: 18px;
   border: none;
}

.btn1 {
   background-color: #409eff;
   color: #ffffff;
   border: none;
}

.btn2 {
   background-color: #f56c6c;
   color: #ffffff;
   border: none;
}



.table_btn {
   width: 50px;
   height: 28px;
   margin-left: 20px;
   padding-left: 10px;
   padding-right: 10px;
}


</style>

<style>
/* 滑块样式 */
.switch {
   position: relative;
   display: inline-block;
   width: 40px;
   height: 20px;
}

.switch input {
   opacity: 0;
   width: 0;
   height: 0;
}

.slider {
   position: absolute;
   cursor: pointer;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: #ccc;
   transition: .4s;
   border-radius: 34px;
}

.slider:before {
   position: absolute;
   content: "";
   height: 14px;
   width: 14px;
   left: 4px;
   bottom: 3px;
   background-color: white;
   transition: .4s;
   border-radius: 50%;
}

input:checked+.slider {
   background-color: #67c23a;
}

input:checked+.slider:before {
   transform: translateX(16px);
}
</style>

