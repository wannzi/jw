<template>
    <div class="app">
       <div class="U_head">
          <div class="left">
             
            
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
             <th>序号</th>
             <th>账号</th>
             <th>姓名</th>
             <th>部门</th>
             <th>职务</th>
             <th>管理员权限</th>
             <th>精准画像系统</th>
             <th>文件对比系统</th>
             <th>规则模型系统</th>
 
          </tr>
          <tr v-for="(user, index) in users" :key="index">
             <td>{{ user.id || ''}}</td>
             <td>{{ user.account || '' }}</td>
             <td>{{ user.name || '' }}</td>
             <td>{{ user.department || '' }}</td>
             <td>{{ user.office || '' }}</td>
             
             <td>
                <label class="switch">
                   <input type="checkbox" v-model="user.administratorPrivileges" @change="toggleStatus(user)">
                   <span class="slider round"></span>
                </label>
             </td>
             <td class="per_operate">
                <label class="switch">
                   <input type="checkbox" v-model="user.portraitSystem" @change="toggleStatus(user)">
                   <span class="slider round"></span>
                </label>
             </td>
             <td>
                <label class="switch">
                   <input type="checkbox" v-model="user.fileComparison" @change="toggleStatus(user)">
                   <span class="slider round"></span>
                </label>
             </td>
             <td>
                <label class="switch">
                   <input type="checkbox" v-model="user.ruleModel" @change="toggleStatus(user)">
                   <span class="slider round"></span>
                </label>
             </td>
             
          </tr>
       </table>
       <!-- 添加分页按钮 -->
       <div class="page">
         <button style="display: block; border: none; padding: 0; overflow: hidden;">
            <img src="../../assets/UserManagement/左_left.png" style="width: 100%; height: 100%; display: block;">
         </button>
         <button v-for="page in pages" :key="page" :class="{ activePage: page === currentPage }"
            @click="changePage(page)">
            {{ page }}
         </button>
         <button style="display: block; border: none; padding: 0; overflow: hidden;">
            <img src="../../assets/UserManagement/右_right.png" style="width: 100%; height: 100%; display: block;">
         </button>

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
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges:'启用' ,portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
             
 
          ],
          //当前页码
          currentPage: 2,
          pageSize: 10,
          totalPages: 5,
          totalEntries: 0,
          
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
 
 
 <style>
 .U_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 100px;
    margin-left: 69px;
    margin-top: 35px;
 
 }
 
 
 
 

 

 </style>
 
 <style scoped>

 
 table .per_operate {
    width: 100px;
 }
 
 table td:first-child {
    width: 1px;
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
 
