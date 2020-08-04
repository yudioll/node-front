import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: () => import('@/components/login/login')
    },
    {
        path: 'home',
        component: () => import('@/views/home.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base:'desktop',
    routes
})

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token')) {
        next()
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
