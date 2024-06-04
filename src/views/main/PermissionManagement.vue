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

      <el-table :header-cell-style="()=>'background:#409EFF20'" :data="users" border style="width: 90%; height: 100%;" class="main_table" fit stripe>
         <el-table-column label="序号" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
         </el-table-column>
         <el-table-column label="账号" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.account }}</template>
         </el-table-column>
         <el-table-column label="姓名" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
         </el-table-column>
         <el-table-column label="部门" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.department }}</template>
         </el-table-column>
         <el-table-column label="职务" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">{{ scope.row.office }}</template>
         </el-table-column>
         <el-table-column label="管理员权限" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.administratorPrivileges" active-color="#13ce66"
                  ></el-switch>
            </template>
         </el-table-column>
         <el-table-column label="精准画像系统" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.portraitSystem" active-color="#13ce66"
                 ></el-switch>
            </template>
         </el-table-column>
         <el-table-column label="文件对比系统" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.fileComparison" active-color="#13ce66"
                  ></el-switch>
            </template>
         </el-table-column>
         <el-table-column label="规则模型系统" label-class-name="custom-header-color" align="center">
            <template slot-scope="scope">
               <el-switch v-model="scope.row.ruleModel" active-color="#13ce66" ></el-switch>
            </template>
         </el-table-column>

      </el-table>



      
      <!-- 添加分页按钮 -->
      <el-pagination background layout="prev, pager, next" :total="50" class="page">
      </el-pagination>

   </div>

</template>
<script>
export default {
   name: 'UserManagement',
   data() {
      return {
         // 表格数据
         users: [
            { id: 1, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 2, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 3, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 4, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 5, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 6, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 7, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 8, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 9, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },
            { id: 10, account: 1001, name: '张三', department: '技术部', office: '主任', administratorPrivileges: '启用', portraitSystem: '启用', fileComparison: '启用', ruleModel: '启用' },


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
   },
   methods: {
      
   },
   computed: {

    
   }
}
</script>





