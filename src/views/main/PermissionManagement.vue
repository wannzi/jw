<template>
   <div class="app">
      <div class="U_head">
         <div class="left">
            <div class="right">
               <el-input v-model="input" placeholder="请输入关键词搜索" size="medium"></el-input>
               <el-button type="primary" icon="el-icon-search" size="medium"></el-button>
            </div>
         </div>
      </div>

      <!-- 表格 -->
      <el-table :header-cell-style="() => 'background:#409EFF20'" :data="users" border style="width: 90%; height: 100%;"
         class="main_table" fit>
         <el-table-column label="序号" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.userId }}</template>
         </el-table-column>
         <el-table-column label="账号" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
         </el-table-column>
         <el-table-column label="姓名" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.realName }}</template>
         </el-table-column>
         <el-table-column label="部门" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.dept }}</template>
         </el-table-column>
         <el-table-column label="职务" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.duties }}</template>
         </el-table-column>
         <el-table-column label="管理员权限" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.administratorPrivileges" active-color="#13ce66"
                  @change="changePrivileges(scope.row.userId, 'administratorPrivileges', scope.row.administratorPrivileges)"></el-switch>
            </template>
         </el-table-column>
         <el-table-column label="精准画像系统" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.portraitSystem" active-color="#13ce66"
                  @change="changePrivileges(scope.row.userId, 'portraitSystem', scope.row.portraitSystem)"></el-switch>
            </template>
         </el-table-column>
         <el-table-column label="文件对比系统" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.fileComparison" active-color="#13ce66"
                  @change="changePrivileges(scope.row.userId, 'fileComparison', scope.row.fileComparison)"></el-switch>
            </template>
         </el-table-column>
         <el-table-column label="规则模型系统" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.ruleModel" active-color="#13ce66"
                  @change="changePrivileges(scope.row.userId, 'ruleModel', scope.row.ruleModel)"></el-switch>
            </template>
         </el-table-column>
      </el-table>

      <!-- 添加分页按钮 -->
      <el-pagination background layout="prev, pager, next" :total="50" class="page"></el-pagination>
   </div>
</template>
<script>
import { swichUserAuth } from '@/api/userManagement/index.js';


export default {
   name: 'UserManagement',
   data() {
      return {
         // 表格数据
         users: [
            { userId: 1, userName: 1001, realName: '张三', dept: '技术部', duties: '主任', administratorPrivileges: 0, portraitSystem: 1, fileComparison: 0, ruleModel: 1 },
            { userId: 2, userName: 1002, realName: '李四', dept: '财务部', duties: '副总', administratorPrivileges: 1, portraitSystem: 0, fileComparison: 1, ruleModel: 0 },
            { userId: 3, userName: 1003, realName: '李四', dept: '财务部', duties: '副总', administratorPrivileges: 1, portraitSystem: 0, fileComparison: 1, ruleModel: 0 },                                   
            { userId: 4, userName: 1004, realName: '赵六', dept: '人事部', duties: '总监', administratorPrivileges: 1, portraitSystem: 0, fileComparison: 1, ruleModel: 0 },
            { userId: 5, userName: 1005, realName: '李四', dept: '财务部', duties: '副总', administratorPrivileges: 0, portraitSystem: 1, fileComparison: 0, ruleModel: 1 },
            { userId: 6, userName: 1006, realName: '王五', dept: '财务部', duties: '经理', administratorPrivileges: 0, portraitSystem: 1, fileComparison: 0, ruleModel: 1 },
            { userId: 7, userName: 1006, realName: '王五', dept: '财务部', duties: '经理', administratorPrivileges: 0, portraitSystem: 1, fileComparison: 0, ruleModel: 1 },
            { userId: 8, userName: 1006, realName: '王五', dept: '财务部', duties: '经理', administratorPrivileges: 0, portraitSystem: 1, fileComparison: 0, ruleModel: 1 },
            { userId: 9, userName: 1006, realName: '王五', dept: '财务部', duties: '经理', administratorPrivileges: 0, portraitSystem: 1, fileComparison: 0, ruleModel: 1 },
            { userId: 10, userName: 1006, realName: '王五', dept: '财务部', duties: '经理', administratorPrivileges: 0, portraitSystem: 1, fileComparison: 0, ruleModel: 1 },

         ],
         //当前页码
         currentPage: 2,
         pageSize: 10,
         totalPages: 5,
         totalEntries: 0,
         input: '',


      };
   },
   created() {
     
      // 转换 users 数据中的 0 和 1 为布尔值
      this.users = this.users.map(user => ({
         ...user,
         administratorPrivileges: this.isUsed(user.administratorPrivileges),
         portraitSystem: this.isUsed(user.portraitSystem),
         fileComparison: this.isUsed(user.fileComparison),
         ruleModel: this.isUsed(user.ruleModel),
      }));
   },
   mounted() {

   },
   methods: {
      // 判断是否开启
      isUsed(isUsed) {
         return isUsed === 1;
      },
      //请求更改权限
      async changePrivileges(userId) {
  
         //将权限加入数组
         
         const user =this.users.find(user => user.userId === userId);
         const authArr = [
            user.administratorPrivileges ? 1 : 0,
            user.portraitSystem ? 1 : 0,
            user.fileComparison ? 1 : 0,
            user.ruleModel ? 1 : 0,
         ]
        
         console.log(authArr);
         const res = await swichUserAuth(userId,authArr);
         console.log(res);
      },
      //搜索接口
      searchApi() {

      },

   },
   computed: {


   }
}
</script>
