// 导入依赖包和模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Personal from 'pages/personalCenter/' // 个人中心
import PassModify from 'pages/personalCenter/PassModify' // 修改密码
import Category from 'pages/category/' // 总分类
import Nav from 'pages/category/Nav' // 分类导航页
import Detail from 'pages/Detail' // 详情页
import Login from 'pages/login/' // 登录
import Username from 'pages/login/Username' // 用户名登录
import Tel from 'pages/login/Tel' // 手机登录
import Register from 'pages/register/' // 注册

Vue.use( VueRouter );

// 路由表
const routes = [
    // 个人中心
    {
        path: '/personal',
        component: Personal,
        name: 'personal'
    },
    // 密码管理
    {
        path: '/passModify',
        component: PassModify,
        name: 'passModify'
    },
    // 分类
    {
        path: '/category',
        component: Category,
        name: 'category',
    },
    // 二级分类
    {
        path: '/nav',
        component: Nav,
        name: 'nav'
    },
    // 详情
    {
        path: '/detail',
        component: Detail,
        name: 'detail'
    },
    // 登录
    {
        path: '/login',
        component: Login,
        children: [
            {
                path: '/',
                redirect: 'username'
            },
            {
                path: 'username',
                component: Username,
                name: 'username'
            },
            {
                path: 'tel',
                component: Tel,
                name: 'tel'
            }
        ]
    },
    // 注册
    {
        path: '/register',
        component: Register,
        name: 'register'
    }
];

// 定义路由
const router = new VueRouter({
    routes,
    mode: 'history'
});

// 导出
export default router;