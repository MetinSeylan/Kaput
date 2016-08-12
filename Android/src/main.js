import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';


import routes from './http/route';
import middleware from './http/middleware';
import config from './config';
import app from './app.vue';

Vue.use(VueRouter);
Vue.use(VueSocketio, config.socket);

var router = new VueRouter({linkActiveClass: 'active'});
router.map(routes);
middleware(router);


document.addEventListener("deviceready", () => {

    window.plugins.insomnia.keepAwake();

    cordova.plugins.backgroundMode.enable();

    cordova.plugins.backgroundMode.setDefaults({
        title:  "Car Tracker",
        ticker: "123",
        text:   "Running 🚘"
    });

    router.start(Vue.extend(app), 'app');
}, false);

