import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from '@/store'
import "@/mock/mockSever"
import "swiper/css/swiper.css"
import * as API from '@/api'
import {Button,Select,MessageBox,Message} from 'element-ui'

Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

//element
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 } // 项目中所有拥有size属性的默认尺寸均为small 弹框的处事Index为3000
Vue.use(Button)
Vue.use(Select)
// Vue.use(MessageBox) 会有bug
Vue.component(MessageBox.name, MessageBox)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


import VueLazyload from "vue-lazyload";

// Vue.use(VueLazyload);
//建议自定义配置插件，设置相应的loading图和图片错误显示的统一图片
Vue.use(VueLazyload, {
preLoad: 1.3,
loading: require('./assets/bebe16d7c3a6154464a84469ec7b3203.gif'),
attempt: 1
})




new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
}).$mount('#app')