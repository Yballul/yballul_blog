import axios from 'axios'
import { Message, Loading } from 'element-ui'

let ajaxTimes = 0;
let loadingInstance;
//  request请求拦截器
axios.interceptors.request.use(config => {

    // let token=localstorage.getItem('token');
    // token && (config.headers.Authorization=token);//请求携带token
    // config.headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded'  //转换数据格式
    // }
    ajaxTimes++;
    loadingInstance = Loading.service({
        lock: true,
        text: '飞速加载中……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;
}, error => {
    return Promise.reject(error);
})


// response响应拦截器
axios.interceptors.response.use(response => {
    ajaxTimes--;
    if (ajaxTimes == 0) {
        setTimeout(() => {
            loadingInstance.close();
        }, 300)
    }
    return response;
}, error => {
    setTimeout(() => {
        loadingInstance.close();
    }, 300)
    let { response } = error;
    if (response) {
        //服务器有返回内容
        var errormsg = '';
        switch (response.status) {
            case 400:
                errormsg = '错误请求'
                break;
            case 401:
                errormsg = '未登录,请重新登录'
                break;
            case 403:
                errormsg = '决绝访问'
                break;
            case 404:
                errormsg = '请求错误，未找到该资源'
                break;
            case 405:
                errormsg = '请求方法未允许'
                break;
            case 408:
                errormsg = '请求超时'
                break;
            case 500:
                errormsg = '服务器出错'
                break;
            case 501:
                errormsg = '网络未实现'
                break;
            case 502:
                errormsg = '网络错误'
                break;
            case 503:
                errormsg = '服务不可用'
                break;
            case 504:
                errormsg = '网络超时'
                break;
            case 505:
                errormsg = 'http版本不支持该请求'
                break;
            default:
                errormsg = '连接错误'
        }
        Message({ type: 'error', message: errormsg });
        return false;
    } else {
        //服务器连结果都没有返回  有可能是断网或者服务器奔溃
        if (!window.navigator.online) {
            //断网处理
            Message('网络中断');
            return;
        } else {
            //服务器奔了
            Message('服务器崩了');
            return Promise.reject(error);
        }
    }
})

let baseURL = "http://localhost:4087/"
export default function request(method, detailUrl, data) {
    let url = baseURL + detailUrl;
    if (method == 'get') {
        return axios.get(url, data);
    } else {
        return axios.post(url, data);
    }
}