import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../components/Login/Login.vue'),
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/regist',
        name: 'Regist',
        component: () =>
            import ('../components/Regist/Regist.vue'),
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/home',
        name: 'Home',
        redirect: '/home/index',
        component: () =>
            import ('../components/Home/Home.vue'),
        meta: {
            requireAuth: false
        },
        children: [{
                path: '/home/index',
                name: 'Index',
                component: () =>
                    import ('../components/Home/HomeComponent/Index.vue')
            },
            {
                path: '/home/article/:id',
                name: 'Article',
                component: () =>
                    import ('../components/Home/HomeComponent/Article.vue')
            },
            {
                path: '/home/cate/:id',
                name: 'Cate',
                component: () =>
                    import ('../components/Home/HomeComponent/Cate.vue')
            },
            {
                path: '/home/develop',
                name: 'Develop',
                component: () =>
                    import ('../components/Home/HomeComponent/Develop.vue')
            },
            {
                path: '/home/aboutMe',
                name: 'AboutMe',
                component: () =>
                    import ('../components/Home/HomeComponent/AboutMe.vue')
            },
            {
                path: '/home/search/:detail',
                name: 'Search',
                component: () =>
                    import ('../components/Home/HomeComponent/Search.vue')
            }
        ]
    }
]

//配置路由导航守卫
// router.beforeEach = (from, to, next) => {

// }

//解决在路由重复时报错的现象
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(locueation) {
//     return originalPush.call(this, location).catch(err => err)
// }
const router = new VueRouter({
    routes
})

export default router