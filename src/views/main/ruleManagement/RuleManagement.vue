<template>
   <div class="app">
      <div class="U_head">
         <div class="left">
            <button class="btn1" @click="addRule()">新建规则</button>
            <button class="btn2" @click="prepareRuleDel()">删除规则</button>

         </div>

         <div class="right">
            <input type="text" placeholder="请输入关键词搜索">
            <button>
               <img src="../../../assets/UserManagement/搜索_search.png">
            </button>
         </div>
      </div>

      <!-- 表格 -->
      <table class="main_table">
         <tr>
            <th><input type="checkbox" @change="toggleAll" v-model="allSelected" />全选</th>
            <th>规则名称</th>
            <th>规则描述</th>
            <th>规则类型</th>
            <th>创建者</th>
            <th>创建时间</th>

            <th>操作</th>

         </tr>
         <tr v-for="(rule, index) in rules" :key="index">
            <td><input type="checkbox" v-model="rule.selected" /></td>
            <td>{{ rule.ruleName || '' }}</td>
            <td>{{ rule.ruleDesc || '' }}</td>
            <td>{{ rule.ruleType || '' }}</td>
            <td>{{ rule.creator || '' }}</td>
            <td>{{ rule.createTime || '' }}</td>

            <td class="rule_operate">
               <button class="btn1 table_btn" @click="editRule(rule)">编辑</button>
               <button class="btn2 table_btn" @click="prepareRuleDel(rule)">删除</button>
               <button class="btn3 table_btn" v-if="rule.isPublic === false"
                  @click="changeRuleStatus(rule)">设为公共规则</button>
               <button v-else class="btn3 table_btn private_btn" @click="changeRuleStatus(rule)">设为私有规则</button>
            </td>
         </tr>
      </table>
      <!-- 添加分页按钮 -->
      <div class="page">
         <button>
            <img src="../../../assets/UserManagement/左_left.png" style="width: 100%; height: 100%; display: block;">
         </button>
         <button v-for="page in pages" :key="page" :class="{ activePage: page === currentPage }"
            @click="changePage(page)">
            {{ page }}
         </button>
         <button>
            <img src="../../../assets/UserManagement/右_right.png" style="width: 100%; height: 100%; display: block;">
         </button>

      </div>


      <!-- 弹窗 -->
      <!-- 删除规则弹窗 -->
      <div v-if="ruleDelVisible" class="dialog-backdrop" @click.self="closePopup()">
         <div class="dialog-content" @click.stop>

            <h3>确认删除以下规则?</h3>
            <table>
               <tr v-for="(rule, index) in selectedRules" :key="index">
                  <th>{{ rule.ruleName }}</th>
               </tr>
            </table>
            <button @click="deleteRule()">删除</button>
            <button @click="closePopup()">关闭</button>
         </div>

      </div>
      <!-- 编辑规则弹窗 -->
      <div v-if="ruleEditVisible" class="dialog-backdrop" @click.self="closePopup()">
         <div class="dialog-content" @click.stop>
            <form>
               <h2>编辑规则</h2>

               <div>
                  <label for="edit-account">规则名称:</label>
                  <input id="edit-account" type="text" v-model="editingRule.ruleName" readonly>
               </div>
               <div>
                  <label for="edit-name">规则描述:</label>
                  <input id="edit-name" type="text" v-model="editingRule.ruleDesc">
               </div>


               <button type="submit" @click="saveEdit()">保存</button>
               <button @click="closePopup('popup4')">取消</button>
            </form>

         </div>

      </div>
      <!-- 新建规则弹窗 -->
      <div v-if="ruleAddVisible" class="dialog-backdrop" @click.self="closePopup()">
         <div class="dialog-content" @click.stop>
            <form>
               <h2>新建规则</h2>

               <div>
                  <label for="edit-account">规则名称:</label>
                  <input id="edit-account" type="text"  readonly>
               </div>
               <div>
                  <label for="edit-name">规则描述:</label>
                  <input id="edit-name" type="text" >
               </div>


               <button type="submit" @click="intoAddRule()">新建</button>
               <button @click="closePopup('popup4')">取消</button>
            </form>

         </div>

      </div>

   </div>
</template>
<script>


export default {
   name: 'RuleManagement',
   data() {
      return {
         // 表格数据
         rules: [
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },
            { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1', isPublic: true, selected: false },



         ],
         //当前页码
         currentPage: 2,
         pageSize: 10,
         totalPages: 5,
         totalEntries: 0,
         allSelected: false,
         // 弹窗状态
         ruleDelVisible: false,
         ruleEditVisible: false,
         ruleAddVisible: false,
         //当前编辑的规则
         editingRule: null,
         selectedRules: [],
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
            this.rules.forEach(rule => rule.selected = true); // 全选
         } else {
            this.rules.forEach(rule => rule.selected = false); // 全部取消选中
         }

      },

      // 处理删除规则逻辑
      prepareRuleDel(rule = null) {

         if (rule) {
            // 单个用户删除
            this.selectedRules = [rule];
         } else {
            // 批量删除
            this.selectedRules = this.rules.filter(u => u.selected);
         }


         this.ruleDelVisible = true;
      },
      deleteRule() {
         this.selectedRules.forEach(rule => {
            const index = this.rules.indexOf(rule);
            if (index !== -1) {
               this.rules.splice(index, 1);
            }
         });
         alert('删除成功');
         this.closePopup('popup2');
         // 清空选中的用户数组
         this.selectedRules = [];
      },
      closePopup() {
         this.ruleDelVisible = false;
         this.ruleEditVisible = false;
         this.ruleAddVisible = false;
      },
      // 处理规则状态
      changeRuleStatus(rule) {
         this.$set(rule, 'isPublic', !rule.isPublic);

      },
      // 新建规则弹窗
      addRule() {
         // 进入新建规则页面
         // this.$router.push({ name: 'AddRules' });
         this.ruleAddVisible = true;

      },
      intoAddRule() {
         this.$router.push({ name: 'AddRules' });
      },
      // 编辑规则
      editRule(rule) {
         this.editingRule = Object.assign({}, rule);
         this.ruleEditVisible = true;
      },
      //保存编辑

      saveEdit() {
         this.ruleEditVisible = false;
         alert('保存成功');
      }

   },

   // 计算属性
   computed: {

      // 更新页码
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
   margin-left: 20px;
   padding-left: 10px;
   padding-right: 10px;
   font-size: 0.7vw;
}

.table_btn:last-child {
   width: 6vw;
   height: 28px;
   margin-left: 20px;
   padding-left: 10px;
   padding-right: 10px;
}

.private_btn {
   background-color: #67c23a;
}
</style>

<style scoped>
table .rule_operate {
   width: 16vw;
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
