import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {   
            path: '/dashboard',
            name: 'DashboardView',
            component: () => import('@/views/dashboard/DashboardView.vue'),
            children:[
                { path: 'userManagement' , name: 'UserManagement', component: () => import('@/views/main/userManagement/UserManagement.vue') },
                { path: 'permissionManagement' , name: 'PermissionManagement', component: () => import('@/views/main/PermissionManagement.vue') },
                { path: 'fileManagement' , name: 'FileManagement', component: () => import('@/views/main/FileManagement.vue') },
                { path: 'ruleManagement' , name: 'RuleManagement', component: () => import('@/views/main/ruleManagement/RuleManagement.vue') }
            ]
        },
        {
        path:'/DrawSystem',
        name:'DrawSystem',
        component:() => import('@/views/DrawSystem/SelectDraw.vue'),
        children:[
                {
                    path: 'PeopleResult',name:'PeopleResult',component:()=> import('@/views/DrawSystem/PeopleResult.vue')},
            ]
        }

    ]
});


export default router;
