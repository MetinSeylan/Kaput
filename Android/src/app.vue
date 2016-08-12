<template>
    <loading :show="!server" text="Connecting Server"></loading>
    <loading :show="server && !serverPerm" text="Authentication"></loading>
    <router-view v-if="bluetoothStatus && gpsAvailable && server && serverPerm"></router-view>
</template>

<script type="text/babel">
    import store from './vuex/store'
    import { initBluetooth } from './vuex/bluetooth/actions';
    import { initGps, startLocation } from './vuex/gps/actions';
    import { server_token } from './config';
    import {status as serverStatus} from './vuex/server/actions';
    import {auth} from './vuex/server/actions';
    import loading from 'vux/dist/components/loading/index';

    export default{
        components:{
            loading
        },
        store,
        vuex: {
            actions: {
                initBluetooth,
                initGps,
                serverStatus,
                startLocation,
                auth
            },
            getters: {
                bluetoothStatus: ({bluetooth}) => bluetooth.status,
                gpsAvailable: ({gps}) => gps.available,
                server: ({server}) => server.status,
                serverPerm: ({server}) => server.auth
            }
        },
        ready(){
            var vm = this;
            this.initBluetooth().then(() => {
                vm.initGps();
            });

            cordova.plugins.backgroundMode.ondeactivate = () => {
                vm.initBluetooth();
                vm.initGps();
            }

            this.startLocation(100);
        },
        sockets: {
            connect(){
                this.serverStatus(true);
                this.$socket.emit('auth', server_token);
            },
            disconnect(){
                this.serverStatus(false);
            },
            'auth': function(status){
                this.auth(status);
            }
        }
    }
</script>

<style lang="sass">
    @import "style/app.scss";
</style>