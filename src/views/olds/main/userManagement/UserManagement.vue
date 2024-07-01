<template>
  <div class="app">
    <div class="U_head">
      <el-row>
        <el-button type="primary" size="medium" @click="showAddUser()">添加用户</el-button>
        <el-button type="danger" size="medium" @click="showDelUser()">删除用户</el-button>
        <el-button type="warning" size="medium" @click="showResetPassword()">重置密码</el-button>
      </el-row>

      <div class="right">
        <el-input v-model="input" placeholder="请输入关键词搜索" size="medium"></el-input>
        <el-button type="primary" icon="el-icon-search" size="medium"></el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table :header-cell-style="() => 'background:#409EFF20'" ref="multipleTable" size="medium" :data="tableData"
      :row-style="commonRowStyle" stripe style="width: 90%" class="main_table"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="100" reserve-selection
        label-class-name="custom-header-color">
      </el-table-column>
      <el-table-column prop="userName" label="账号" :height="20" align="center"
        label-class-name="custom-header-color"></el-table-column>
      <el-table-column prop="realName" label="姓名" align="center"
        label-class-name="custom-header-color"></el-table-column>
      <el-table-column prop="dept" label="部门" align="center" label-class-name="custom-header-color"></el-table-column>
      <el-table-column prop="duties" label="职务" align="center" label-class-name="custom-header-color"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center" label-class-name="custom-header-color"></el-table-column>
      <el-table-column prop="status" label="账号状态" align="center" label-class-name="custom-header-color"
        v-slot="{ row }">
        <el-switch v-model="row.status" active-color="#13ce66"
          @change="changeStatus(row.userId, row.status)"></el-switch>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center" label-class-name="custom-header-color" v-slot="{ row }">
        <el-button type="primary" size="small" @click="showEditUser(row)">编辑</el-button>
        <el-button type="danger" size="small" @click="showDelUser(row)">删除</el-button>
        <el-button type="warning" size="small" @click="showResetPassword(row)">重置密码</el-button>
      </el-table-column>
    </el-table>

    <!-- 添加分页按钮 -->
    <el-pagination background layout="prev, pager, next" :total="50" class="page">
    </el-pagination>

    <!-- 添加用户弹窗 -->
    <el-dialog :visible.sync="addUserVisible" title="添加用户" :modal-append-to-body="false" width="30%">
      <el-form :form="addUserForm" label-width="50px">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="addUserForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="addUserForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-input v-model="addUserForm.department" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="duties">
          <el-input v-model="addUserForm.office" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addUserForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 批量删除弹窗 -->
    <el-dialog :visible.sync="delUserVisible" title="删除用户" :modal-append-to-body="false" width="30%">
      <!-- 根据删除类型显示不同的提示信息 -->
      <el-alert :title="selectedUsers.length > 1 ? '确定删除选中的用户吗？' : '确定删除该用户吗？'" type="warning" center :closable="false">
      </el-alert>

      <el-table :data="selectedUsers" style="width: 100%" border fit size="mini">
        <el-table-column prop="userName" label="账号" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="dept" label="部门" align="center"></el-table-column>
        <el-table-column prop="duties" label="职务" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 重置密码弹窗 -->
    <el-dialog :visible.sync="resetPasswordVisibel" title="重置密码" :modal-append-to-body="false" width="30%">
      <el-alert :title="selectedUsers.length > 1 ? '确定重置选中的用户密码吗？' : '确定重置该用户密码吗？'" type="warning" center
        :closable="false">
      </el-alert>

      <el-table :data="selectedUsers" style="width: 100%" border fit size="mini">
        <el-table-column prop="userName" label="账号" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="dept" label="部门" align="center"></el-table-column>
        <el-table-column prop="duties" label="职务" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPasswordVisibel = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹窗 -->
    <el-dialog :visible.sync="editUserVisible" title="编辑用户" :modal-append-to-body="false" width="30%">
      <el-form :form="editUserIntoForm" :model="editingUser" ref="editUserForm" label-width="50px">
        <el-form-item label="账号">
          <el-input v-model="editingUser.userName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editingUser.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="editingUser.dept" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="editingUser.duties" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editingUser.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, delUser, getUserList, initPwd, switchUserStatus } from '@/api/userManagement/index.js';



export default {
  name: 'UserManagement',

  data() {
    return {
      // 表格数据
      tableData: [
        { userId: "0", userName: '1001', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 0 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '1002', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
        { userId: '1', userName: '账号', realName: '姓名', dept: '部门', duties: '职务', phone: '电话', status: 1 },
      ],
      //当前页码
      selectedUsers: [], // 用于存储选中的用户
      currentPage: 2,
      pageSize: 10,
      totalPages: 5,
      totalEntries: 0,
      // allSelected: false,
      // 弹窗状态
      addUserVisible: false,
      delUserVisible: false,
      resetPasswordVisibel: false,
      editUserVisible: false,
      editingUser: {}, // 编辑用户信息
      addUserForm: {
        // 表单数据初始化
        userName: '',
        realName: '',
        dept: '',
        duties: '',
        phone: '',
      },
      input: '', // 搜索框内容
     
      commonRowStyle:{}
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {
  },

  methods: {
    // 弹窗开关
    showAddUser() {
      this.addUserVisible = true;
    },

    showDelUser(user = null) {
      if (user) {
        // 单个用户删除
        this.selectedUsers = [user];
        this.delUserVisible = true;
      } else {
        // 批量删除
        if (this.selectedUsers.length > 0) {
          this.delUserVisible = true;
        } else {
          this.$message({
            message: "请选择要删除的用户",
            type: "warning"
          });
        }
      }
    },



    showResetPassword(user = null) {
      if (user) {
        // 单个用户重置密码
        this.selectedUsers = [user];
        this.resetPasswordVisibel = true;
      } else {
        // 批量重置密码
        if (this.selectedUsers.length > 0) {
          this.resetPasswordVisibel = true;
        } else {
          this.$message({
            message: "请选择要重置密码的用户",
            type: "warning"
          });
        }
      }
    },



    showEditUser(user) {
      this.editingUser = user;
      this.editUserVisible = true;

    },
    handleSelectionChange(selected) {
      this.selectedUsers = selected; // 更新 selectedUsers 数组
    },


    //后端获取用户表格数据
    async getTableData() {
      //处理逻辑
      try {
        const response = await getUserList();
        console.log(response);

      } catch (error) {
        this.$message.error(error.message, '获取失败');
      }

    },
    //更改账号状态接口
    async changeStatus(userId, status) {
      const response = await switchUserStatus(userId, status);
      console.log(response);
    },
    async addUser() {
      const response = await addUser(this.addUserForm);
      console.log(response);

      //处理逻辑

      this.$message({
        message: "添加用户成功",
        type: "success"
      });
      this.addUserVisible = false;
    },
    async deleteUser() {
      //处理删除逻辑
      const userId = this.selectedUsers.map(item => item.userId);
      console.log(userId);
      const response = await delUser(userId);
      console.log(response);
      this.$message({
        message: "删除用户成功",
        type: "success"
      });
      this.delUserVisible = false;
      this.selectedUsers = [];
    },
    //处理重置密码逻辑
     async resetPassword() {
      
      const userId = this.selectedUsers.map(item => item.userId);
      const response = await initPwd(userId);
      console.log(response);
      this.$message({
        message: "重置密码成功",
        type: "success"
      });
      this.resetPasswordVisibel = false;
      this.selectedUsers = [];
    },
    editUser() {
      //处理编辑逻辑

      this.$message({
        message: "编辑用户成功",
        type: "success"
      });
      this.editUserVisible = false;
    },
    //搜索接口
    searchApi() {

    },

  },


}
</script>

<style scoped>
::v-deep .el-table--medium .el-table__cell {
  padding: 8px 0;
}
</style>

<style>
.el-button {
  /* font-size: 14px; */
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
