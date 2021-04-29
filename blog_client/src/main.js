import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import request from "./network/request.js"
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';


//时间格式处理的过滤器
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

//在原型对象上挂载自己的网络请求函数
Vue.prototype.request = request;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')