<template>
   <div class="app">
      <div class="U_head">
         <div class="left">
            <button class="btn1">新建规则</button>
            <button class="btn2">删除规则</button>
            
         </div>

         <div class="right">
            <input type="text" placeholder="请输入关键词搜索">
            <button></button>
         </div>
      </div>

      <!-- 表格 -->
      <table>
         <tr>
            <th><input type="checkbox" @change="toggleAll" v-model="allSelected" />全选</th>
            <th>规则名称</th>
            <th>规则描述</th>
            <th>规则类型</th>
            <th>创建者</th>
            <th>创建时间</th>
            
            <th>操作</th>

         </tr>
         <tr v-for="(user, index) in users" :key="index">
            <td><input type="checkbox" v-model="user.selected" /></td>
            <td>{{ user.ruleName || '' }}</td>
            <td>{{ user.ruleDesc || '' }}</td>
            <td>{{ user.ruleType || '' }}</td>
            <td>{{ user.creator || '' }}</td>
            <td>{{ user.createTime || '' }}</td>
           
            <td class="rule_operate">
               <button class="btn1 table_btn">编辑</button>
               <button class="btn2 table_btn">删除</button>
               <button class="btn3 table_btn">设为公共规则</button>
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
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
               { ruleName: '规则1', ruleDesc: '规则描述1', ruleType: '规则类型1', creator: '创建者1', createTime: '创建时间1' , selected: false },
             

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
      },
       // 处理全选逻辑
       toggleAll() {
         if (this.allSelected) { // 检查是否已全选
            this.users.forEach(user => user.selected = true); // 全选
         } else {
            this.users.forEach(user => user.selected = false); // 全部取消选中
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

<style>


table .rule_operate {
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