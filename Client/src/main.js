import Vue from 'vue';
import VueSocketio from 'vue-socket.io';

import config from './config';
import app from './app.vue';

Vue.use(VueSocketio, config.socket);

new Vue({
    el: 'body',
    components: {app}
});