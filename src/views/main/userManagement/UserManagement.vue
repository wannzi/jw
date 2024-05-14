<template>
   <div class="app">
      <div class="U_head">
         <div class="left">
            <button class="btn1" @click="showPopUp('popup1')">添加用户</button>
            <button class="btn2" @click="prepareDeleteUser()">删除用户</button>
            <button class="btn3" @click="prepareResetPassword()">重置密码</button>
         </div>

         <div class="right">
            <input type="text" placeholder="请输入关键词搜索">
            <button></button>
         </div>
      </div>

      <!-- 表格 -->
      <table class="main_table">
         <tr>
            <th><input type="checkbox" @change="toggleAll" v-model="allSelected" />全选</th>
            <th>账号</th>
            <th>姓名</th>
            <th>部门</th>
            <th>职务</th>
            <th>电话</th>
            <th>账号状态</th>
            <th>操作</th>

         </tr>
         <tr v-for="(user, index) in users" :key="index">
            <td><input type="checkbox" v-model="user.selected" /></td>
            <td>{{ user.account || '' }}</td>
            <td>{{ user.name || '' }}</td>
            <td>{{ user.department || '' }}</td>
            <td>{{ user.office || '' }}</td>
            <td>{{ user.phone || '' }}</td>
            <td>
               <label class="switch">
                  <input type="checkbox" v-model="user.status" @change="toggleStatus(user)">
                  <span class="slider round"></span>
               </label>
            </td>
            <td class="user_operate">
               <button class="btn1 table_btn" @click="editUser(user)">编辑</button>
               <button class="btn2 table_btn" @click="prepareDeleteUser(user)">删除</button>
               <button class="btn3 table_btn" @click="prepareResetPassword(user)">重置密码</button>
            </td>
         </tr>
      </table>
      <!-- 添加分页按钮 -->
      <div class="page">
         <button> 上 </button>
         <button v-for="page in pages" :key="page" :class="{ activePage: page === currentPage }"
            @click="changePage(page)">
            {{ page }}
         </button>
         <button> 下 </button>

      </div>





      <!-- 弹窗 -->
      <!-- 添加用户弹窗 -->
      <div v-if="popup1Visible" class="dialog-backdrop" @click.self="closePopup('popup1')">
         <div class="dialog-content" @click.stop>
            <form>
               <h2>添加用户信息</h2>

               <div>
                  <label for="name">账号:</label>
                  <input id="name" type="text">
               </div>
               <div>
                  <label for="name">姓名:</label>
                  <input id="name" type="text">
               </div>
               <div>
                  <label for="department">部门:</label>

                  <select id="department">
                     <option value="技术部">技术部</option>
                     <option value="人事部">人事部</option>
                     <option value="财务部">财务部</option>
                     <option value="市场部">市场部</option>
                     <option value="销售部">销售部</option>
                  </select>
               </div>
               <div>
                  <label for="department">职务:</label>
                  <input id="department" type="text">
               </div>
               <div>
                  <label for="phone">电话:</label>
                  <input id="phone" type="text">
               </div>


               <button type="submit">保存</button>
               <button>取消</button>
            </form>
            <button @click="closePopup('popup1')">关闭</button>
         </div>
      </div>


      <!-- 删除用户弹窗 -->
      <div v-if="popup2Visible" class="dialog-backdrop" @click.self="closePopup('popup2')">
         <div class="dialog-content" @click.stop v-if="selectedUsers.length">
            <!-- 根据选择的用户数量显示不同的标题 -->
            <h3 v-if="selectedUsers.length === 1">确定要删除这个用户吗？</h3>
            <h3 v-else>确定要删除这些用户吗？</h3>
            <table>
               <div v-for="user in selectedUsers" :key="user.account">
                  <th>
                     <label for="account">{{ user.account }}</label>
                     <label for="name">{{ user.name }}</label>
                  </th>
               </div>
            </table>
            <button @click="deleteUser()">删除</button>
            <button @click="closePopup('popup2')">关闭</button>
         </div>
         <div class="dialog-content" @click.stop v-else>
            <h3>请选择要删除的用户</h3>
            <button @click="closePopup('popup2')">关闭</button>
         </div>
      </div>

      <!-- 重置密码弹窗 -->
      <div v-if="popup3Visible" class="dialog-backdrop" @click.self="closePopup('popup3')">
         <div class="dialog-content" @click.stop v-if="selectedUsers.length">
            <!-- ... 重置密码弹窗中的内容 ... -->
            <h3>确定重置这些用户的密码吗？</h3>
            <table action="">
               <div v-for="user in selectedUsers" :key="user.account">
                  <th>
                     <label for="account">{{ user.account }}</label>
                     <label for="name">{{ user.name }}</label>
                  </th>

               </div>
            </table>
            <button @click="resetPassword()">重置</button>
            <button @click="closePopup('popup3')">关闭</button>
         </div>
         <div class="dialog-content" @click.stop v-else>
            <h3>请选择要重置密码的用户</h3>
            <button @click="closePopup('popup3')">关闭</button>
         </div>
      </div>
      <!-- 编辑用户弹窗 -->
      <div v-if="popup4Visible" class="dialog-backdrop" @click.self="closePopup('popup4')">
         <div class="dialog-content" @click.stop>
            <form @submit.prevent="saveUser">
               <h2>编辑用户信息</h2>

               <div>
                  <label for="edit-account">账号:</label>
                  <input id="edit-account" type="text" v-model="editingUser.account" readonly>
               </div>
               <div>
                  <label for="edit-name">姓名:</label>
                  <input id="edit-name" type="text" v-model="editingUser.name">
               </div>
               <div>
                  <label for="edit-department">部门:</label>
                  <input id="edit-department" type="text" v-model="editingUser.department">
               </div>
               <div>
                  <label for="edit-office">职务:</label>
                  <input id="edit-office" type="text" v-model="editingUser.office">
               </div>
               <div>
                  <label for="edit-phone">电话:</label>
                  <input id="edit-phone" type="text" v-model="editingUser.phone">
               </div>

               <button type="submit">保存</button>
               <button @click="closePopup('popup4')">取消</button>
            </form>
            <button @click="closePopup('popup4')">关闭</button>
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
            { account: 1, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 2, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 3, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 4, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 5, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 6, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 7, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 8, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 9, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },
            { account: 10, name: '张三', department: '技术部', office: '主任', phone: '13800000000', status: '启用', selected: false },


         ],
         //当前页码
         currentPage: 2,
         pageSize: 10,
         totalPages: 5,
         totalEntries: 0,
         allSelected: false,
         // 弹窗状态
         popup1Visible: false,
         popup2Visible: false,
         popup3Visible: false,
         popup4Visible: false,
         editingUser: null, // 当前正在编辑的用户
         userToDelete: null, // 即将删除的用户
         selectedUsers: [], // 批量删除的用户

      };
   },
   created() {
   },
   methods: {
      // 点击更改页码
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
      // 弹窗开关
      showPopUp(popupId) {
         this[popupId + 'Visible'] = true;
      },
      closePopup(popupId) {
         this[popupId + 'Visible'] = false;
      },
      // 编辑用户方法
      editUser(user) {
         this.editingUser = Object.assign({}, user); // 创建一个用户的深拷贝
         this.popup4Visible = true; // 显示编辑窗口
      },
      // 保存编辑
      saveUser() {
         const index = this.users.findIndex(u => u.account === this.editingUser.account);
         if (index !== -1) {
            this.users.splice(index, 1, this.editingUser);
            this.closePopup('popup4');
         }
      },
      // 删除用户方法
      prepareDeleteUser(user = null) {
         if (user) {
            // 单个用户删除
            this.selectedUsers = [user];
         } else {
            // 批量删除
            this.selectedUsers = this.users.filter(u => u.selected);
         }
         
         this.showPopUp('popup2');
      },
      deleteUser() {
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
      },
      // 重置密码方法
      prepareResetPassword(user = null) {
         if (user) {
            // 单个用户重置密码
            this.selectedUsers = [user];
         } else {
            // 批量重置密码
            this.selectedUsers = this.users.filter(u => u.selected);
         }
         this.showPopUp('popup3');
      },
      resetPassword() {
         alert('密码重置成功');
         this.closePopup('popup3');
      },





   },
   computed: {

      // 更新页数
      pages() {
         let pages = [];
         console.log(this.totalPages);
         for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
         }
         return pages;
      },
   },

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

.btn3 {
   background-color: #e99d42;
   color: #ffffff;
   border: none;
}

.table_btn {
   width: 3vw;
   height: 28px;
   font-size: 0.8vw;
   margin-left: 20px;
   padding-left: 10px;
   padding-right: 10px;
}

.table_btn:last-child {
   width: 5vw;
   height: 28px;
   margin-left: 20px;
   padding-left: 10px;
   padding-right: 10px;
}

.U_head .right input {
   height: 3vh;
   width: 23vh;
   background-color: transparent;
   border: 1px solid #f9e5ff;
   color: #dddbdb;
   padding-left: 10px;
}

.U_head .right input:focus {
   outline: none;
   /* border-color: #f9e5ff; */
}

.U_head .right input::placeholder {
   color: #bebebe;
}

.U_head .right {
   display: flex;
   align-items: center;
   justify-content: center;
}

.U_head .right button {
   border: none;
   width: 31px;
   height: 31px;
   background-image: url();
}
</style>

<style scoped>
table .user_operate {
   width: 14vw;
}




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




