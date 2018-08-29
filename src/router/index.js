import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Page2 from '@/pages/Page2'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            redirect: { path: '/home' }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            navbar: true,
        },
        {
            path: '/page2',
            name: 'Page 2',
            component: Page2,
            navbar: true,
        }
    ]
})
