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
import MainView from '@/views/MainView.vue';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';

import test from '../App.vue'
import { Message, MessageBox } from 'element-ui';
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path:'/test',
        //     component:test,
        //     name:'test'
        // },

        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/main',
            name: 'main',
            component: MainView,
        },
        {
            path: '/dashboard',
            redirect: '/dashboard/userManagement'
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

            ]
        },
        {
            path: '/fileComparison',
            name: 'FileComparison',
            component: IndexView,
     
            children: [
                {
                    path: '',
                    component: FileComparison,
                    children: [
                        {
                            path: 'exportFunction',
                            name: 'ExportFunction',
                            component: ExportFunction,
                        },
                        {
                            path: 'deleteFunction',
                            name: 'DeleteFunction',
                            component: () => import('@/views/system/fileComparison/function/deleteFunction.vue')
                        },
                        {
                            path: 'searchFunction',
                            name: 'SearchFunction',
                            component: () => import('@/views/system/fileComparison/function/searchFunction.vue')
                        },
                        {
                            path: 'compareFunction',
                            name: 'CompareFunction',
                            component: () => import('@/views/system/fileComparison/function/compareFunction.vue')

                        },
                        {
                            path: 'compareFunction2',
                            name: 'CompareFunction2',
                            component: () => import('@/views/system/fileComparison/function/compareView/compareFunction2.vue'),
                            meta: { allowedFrom: ['CompareFunction'] }
                        },
                        {
                            path: 'compareFunction3',
                            name: 'CompareFunction3',
                            component: () => import('@/views/system/fileComparison/function/compareView/compareFunction3.vue'),
                            meta: { allowedFrom: ['CompareFunction', 'CompareFunction2'] }
                        },
                    ]
                }
            ]
        },
        {
            path: '/DrawSystem',
            name: 'DrawSystem',
            component: () => import('@/views/DrawSystem/SelectDraw.vue'),
            // children: [
            //     {
            //         path: 'PeopleResult',
            //         name: 'PeopleResult',
            //         component: () => import('@/views/DrawSystem/PeopleResult.vue')
            //     },
            // ]
        },
        {
            path: '/PeopleResult',
            name: 'PeopleResult',
            component: () => import('@/views/DrawSystem/PeopleResult.vue'),
        }
    ]
});

// // 全局前置守卫
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token'); // 假设登录后会在 localStorage 中存储 token

//   if (to.name !== 'login' && !isAuthenticated) {
//     next({ name: 'login' }); // 如果未登录且目标路由不是登录页，则重定向到登录页
//   } else {
//     next(); // 否则允许继续导航
//   }
// });


// 比对页面拦截
router.beforeEach((to, from, next) => {
    const allowedFrom = to.meta.allowedFrom;

    // 如果当前路由不在白名单中，则判断是否有权限进入
    if (allowedFrom && !allowedFrom.includes(from.name)) {
        next({ name: allowedFrom[0] });
    } else {

        next();
    }

  
    
    
});






export default router;
