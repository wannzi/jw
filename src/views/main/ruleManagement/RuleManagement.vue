<template>
   <div class="app">
      <div class="U_head">

         <el-row>
            <el-button type="primary" @click="showAddRule()" size="medium">新建规则</el-button>
            <el-button type="danger" @click="showDelRule()" size="medium">删除规则</el-button>
         </el-row>

         <div class="right">
            <el-input v-model="input" placeholder="请输入关键词搜索" size="medium"></el-input>
            <el-button type="primary" icon="el-icon-search" size="medium"></el-button>
         </div>
      </div>

      <!-- 表格 -->

      <el-table :header-cell-style="() => 'background:#409EFF20'" ref="multipleTable" :data="rules" stripe border
         size="medium" fit style="width: 90%" class="main_table" @selection-change="handleSelectionChange">
         <el-table-column type="selection" align="center" width="100" reserve-selection
            label-class-name="custom-header-color">
         </el-table-column>
         <el-table-column prop="ruleName" label="规则名称" :height="20" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="ruleDesc" label="规则描述" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="ruleType" label="规则类型" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="creator" label="创建者" align="center"
            label-class-name="custom-header-color"></el-table-column>
         <el-table-column prop="createTime" label="创建时间" align="center"
            label-class-name="custom-header-color"></el-table-column>

         <el-table-column label="操作" width="300" align="center" label-class-name="custom-header-color" v-slot="{ row }">
            <el-button type="primary" @click="showEditRule(row)" size="small">编辑</el-button>
            <el-button type="danger" @click="showDelRule(row)" size="small">删除</el-button>
            <el-button :type="row.isPublic ? 'success' : 'warning'" @click="handleChangeType(row)" size="small">
               {{ row.isPublic ? '设为私有规则' : '设为公共规则' }}
            </el-button>
         </el-table-column>
      </el-table>


      <!-- 添加分页按钮 -->
      <el-pagination background layout="prev, pager, next" :total="50" class="page">
      </el-pagination>



      <!-- 新建规则弹窗 -->

      <el-dialog :visible.sync="addRuleVisible" title="新建规则" width="30%" :modal-append-to-body="false">

         <el-form :form="ruleForm" label-width="80px">
            <el-form-item label="规则名称">
               <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="规则描述" prop="desc">
               <el-input v-model="ruleForm.desc"></el-input>
            </el-form-item>

         </el-form>

         <div slot="footer" class="dialog-footer">
            <el-button @click="addRuleVisible = false">取消</el-button>
            <el-button type="primary" @click="addRule()">确定</el-button>
         </div>
      </el-dialog>

      <!-- 删除弹窗 -->
      <el-dialog :visible.sync="delRuleVisible" title="删除规则" :modal-append-to-body="false" width="30%">
         <!-- 根据删除类型显示不同的提示信息 -->
         <el-alert :title="selectedRules.length > 1 ? '确定删除选中的用户吗？' : '确定删除该用户吗？'" type="warning" center
            :closable="false">
         </el-alert>

         <el-table :data="selectedRules" style="width: 100%" border fit>
            <el-table-column prop="ruleName"></el-table-column>
            <el-table-column prop="ruleDesc"></el-table-column>
            <el-table-column prop="creator"></el-table-column>
            <el-table-column prop="createTime"></el-table-column>
         </el-table>
         <div slot="footer" class="dialog-footer">
            <el-button @click="delRuleVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
         </div>
      </el-dialog>

      <!-- 编辑弹窗 -->
      <el-dialog :visible.sync="editRuleVisible" title="编辑规则" :modal-append-to-body="false" width="30%">

         <el-form :form="eidtForm" label-width="80px">
            <el-form-item label="规则名称">
               <el-input v-model="eidtForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="规则描述" prop="desc">
               <el-input v-model="eidtForm.desc"></el-input>
            </el-form-item>

         </el-form>

         <div slot="footer" class="dialog-footer">
            <el-button @click="editRuleVisible = false">取消</el-button>
            <el-button type="primary" @click="editRule">确定</el-button>
         </div>
      </el-dialog>


   </div>
</template>
<script>


export default {
   name: 'RuleManagement',
   data() {
      return {
         // 表格数据
         rules: [
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '公共规则', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则2', ruleDesc: '规则描述2', ruleType: '规则类型2', creator: '创建者2', createTime: '创建时间2', isPublic: false, selected: false },
            { ruleName: '规则3', ruleDesc: '规则描述3', ruleType: '规则类型3', creator: '创建者3', createTime: '创建时间3', isPublic: true, selected: false },
            { ruleName: '规则4', ruleDesc: '规则描述4', ruleType: '规则类型4', creator: '创建者4', createTime: '创建时间4', isPublic: false, selected: false },
            { ruleName: '规则5', ruleDesc: '规则描述5', ruleType: '规则类型5', creator: '创建者5', createTime: '创建时间5', isPublic: true, selected: false },
            { ruleName: '规则6', ruleDesc: '规则描述6', ruleType: '规则类型6', creator: '创建者6', createTime: '创建时间6', isPublic: false, selected: false },
            { ruleName: '规则7', ruleDesc: '规则描述7', ruleType: '规则类型7', creator: '创建者7', createTime: '创建时间7', isPublic: true, selected: false },
            { ruleName: '规则8', ruleDesc: '规则描述8', ruleType: '规则类型8', creator: '创建者8', createTime: '创建时间8', isPublic: false, selected: false },
            { ruleName: '规则9', ruleDesc: '规则描述9', ruleType: '规则类型9', creator: '创建者9', createTime: '创建时间9', isPublic: true, selected: false },
            { ruleName: '规则10', ruleDesc: '规则描述10', ruleType: '规则类型10', creator: '创建者10', createTime: '创建时间10', isPublic: false, selected: false },


         ],
         //当前页码
         currentPage: 2,
         pageSize: 10,
         totalPages: 5,
         totalEntries: 0,

         // 弹窗状态
         addRuleVisible: false,
         delRuleVisible: false,
         editRuleVisible: false,
         //当前编辑的规则

         selectedRules: [],
         ruleForm: {
            name: '',
            desc: '',
         },
         eidtForm: {
            name: '',
            desc: '',
         },


         input: '',

      };
   },
   created() {
   },
   methods: {

      showAddRule() {
         this.addRuleVisible = true;
      },
      addRule() {
         this.$router.push({ name: 'AddRules' });
      },
      showDelRule(rule = null) {
         if (rule) {
            // 单个用户删除
            this.selectedRules = [rule];
            this.delRuleVisible = true;
         } else {
            // 批量删除
            if (this.selectedRules.length > 0) {
               this.delRuleVisible = true;
            } else {
               this.$message({
                  message: "请选择要删除的规则",
                  type: "warning"
               });
            }
         }
      },
      showEditRule(rule) {
         this.eidtForm.name = rule.ruleName;
         this.eidtForm.desc = rule.ruleDesc;
         this.editRuleVisible = true;
      },




      handleChangeType(row) {
         this.$message({
            message: '规则状态已更新',
            type: 'success'
         });
         row.isPublic = !row.isPublic; // 反转状态
      },
      handleSelectionChange(selected) {
         this.selectedRules = selected; // 更新 selectedUsers 数组
      },
      //获取表格数据接口
      getTableData() {

      },
      //新建规则接口
      addRuleApi() {

      },
      //删除规则接口
      delRuleApi() {

      },
      //编辑规则接口
      editRuleApi() {

      },
      //搜索接口
      searchApi() {

      },


   },

   // 计算属性
   computed: {




   },
}
</script>

<style scoped>
::v-deep .el-table--medium .el-table__cell {
   padding: 8px 0;
}
</style>
