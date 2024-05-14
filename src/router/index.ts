import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'  // 默认进入/dashboard
        },
        {
            path: '/dashboard',
            redirect: '/indexView/dashboard'  // 从/dashboard 重定向到 /indexView/dashboard
        },
        {
            path: '/indexView',
            name: 'indexView',
            component: () => import('@/views/dashboard/indexView.vue'),
            children: [
                {
                    path: 'dashboard',
                    name: 'DashboardView',
                    component: () => import('@/views/dashboard/DashboardView.vue'),
                    children: [
                        { path: 'userManagement', name: 'UserManagement', component: () => import('@/views/main/userManagement/UserManagement.vue') },
                        { path: 'permissionManagement', name: 'PermissionManagement', component: () => import('@/views/main/PermissionManagement.vue') },
                        { path: 'fileManagement', name: 'FileManagement', component: () => import('@/views/main/FileManagement.vue') },
                        { path: 'ruleManagement', name: 'RuleManagement', component: () => import('@/views/main/ruleManagement/RuleManagement.vue') },
                    ]
                },
                {
                    path: 'addRules',
                    name: 'AddRules',
                    component: () => import('@/views/main/ruleManagement/newRules/addRules.vue')
                }
            ]
        }
    ]
});

export default router;
