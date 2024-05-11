<template>
    <div class="app">
       <div class="U_head">
          <div class="left">
             
            
          </div>
 
          <div class="right">
             <input type="text" placeholder="请输入关键词搜索">
             <button></button>
          </div>
       </div>
 
       <!-- 表格 -->
       <table>
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
          <button> 上 </button>
          <button v-for="page in pages" :key="page" :class="{ activePage: page === currentPage }"
             @click="changePage(page)">
             {{ page }}
          </button>
          <button> 下 </button>
          <!-- 根据 totalPages 动态生成更多按钮 -->
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
          totalEntries: 0
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
 
 <style>

 
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
 
 <style>
 .page {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    position: absolute;
    left: 78%;
    height: 30px;
    /* width: 300px; */
 
 }
 
 .page button {
    border: none;
    margin-left: 10px;
    height: 30px;
    width: 28px;
 
 
 }
 .activePage {
   background-color: #409EFF; /* 选中页码的背景颜色 */
   color: white;
 }
 </style>