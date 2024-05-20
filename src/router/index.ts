import Vue from 'vue';
import Router from 'vue-router';
import IndexView from '@/views/dashboard/indexView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import UserManagement from '@/views/main/userManagement/UserManagement.vue';
import PermissionManagement from '@/views/main/PermissionManagement.vue';
import FileManagement from '@/views/main/FileManagement.vue';
import RuleManagement from '@/views/main/ruleManagement/RuleManagement.vue';
import AddRules from '@/views/main/ruleManagement/newRules/addRules.vue';
import FileComparison from '@/views/system/fileComparison/fileComparison.vue';
import ExportFunction from '@/views/system/fileComparison/function/exportFunction.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            component: IndexView,  // 作为布局组件使用，实际路径被隐藏
            children: [
                {
                    path: '',
                    component: DashboardView,
                    children: [
                        {
                            path: 'userManagement',
                            name: 'UserManagement',
                            component: UserManagement
                        },
                        {
                            path: 'permissionManagement',
                            name: 'PermissionManagement',
                            component: PermissionManagement
                        },
                        {
                            path: 'fileManagement',
                            name: 'FileManagement',
                            component: FileManagement
                        },
                        {
                            path: 'ruleManagement',
                            name: 'RuleManagement',
                            component: RuleManagement
                        }
                    ]
                },
                {
                    path: 'addRules',
                    name: 'AddRules',
                    component: AddRules
                },
                {
                    path: 'fileComparison',
                    name: 'FileComparison',
                    component: FileComparison,
                    children:[
                        {
                            path: 'exportFunction',
                            name: 'ExportFunction',
                            component: ExportFunction,
                        },
                        {
                            path: 'deleteFunction',
                            name: 'DeleteFunction',
                            component:()=>import('@/views/system/fileComparison/function/deleteFunction.vue')
                        },
                        {
                            path: 'searchFunction',
                            name: 'SearchFunction',
                            component:()=>import('@/views/system/fileComparison/function/searchFunction.vue')
                        },
                        {
                            path:'compareFunction',
                            name: 'CompareFunction',
                            component:()=>import('@/views/system/fileComparison/function/compareFunction.vue')
                        }
                    ]
                }
            ]
        }
    ]
});