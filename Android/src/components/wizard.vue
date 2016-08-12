<template>

    <loading :show="scaning" text="Scaning..."></loading>
    <loading :show="connecting" text="Connecting..."></loading>

    <headers :left-options="{showBack: false}">Scan Device</headers>
    <box gap="1em">
        <buttons :disabled="scaning" type="primary" @click="scanUnpaired()">Start</buttons>
    </box>


        <group v-if="paired" title="Paired Devices">
            <cell v-for="pair in paired" @click="connect(pair.address)" :title="pair.name" is-link><span v-if="pair.address == connected">connected</span></cell>
        </group>

        <group v-if="unpaired" title="Discovered Devices">
            <cell v-for="unpair in unpaired" @click="connect(unpair.address)" :title="unpair.name" is-link><span v-if="unpair.address == connected">connected</span></cell>
        </group>


</template>

<script type="text/babel">

    import headers from 'vux/dist/components/x-header/index';
    import buttons from 'vux/dist/components/x-button/index';
    import box from 'vux/dist/components/box/index';
    import selector from 'vux/dist/components/selector/index';
    import group from 'vux/dist/components/group/index';
    import cell from 'vux/dist/components/cell/index';
    import loading from 'vux/dist/components/loading/index';
    import scroller from 'vux/dist/components/scroller/index'

    import {getPaired, scanUnpaired, connectDevice} from '../vuex/bluetooth/actions';

    export default{
        components: {
            group,
            cell,
            selector,
            box,
            headers,
            buttons,
            loading,
            scroller
        },
        vuex: {
            getters: {
                paired: ({bluetooth}) => bluetooth.paired,
                unpaired: ({bluetooth}) => bluetooth.unpaired,
                scaning: ({bluetooth}) => bluetooth.scaning,
                connecting: ({bluetooth}) => bluetooth.connecting,
                connected: ({bluetooth}) => bluetooth.connected
            },
            actions:{
                getPaired,
                scanUnpaired,
                connectDevice
            }
        },
        methods:{
            connect(mac){
                var vm = this;
                this.connectDevice(mac).then(() => {
                    vm.$router.go('/dashboard');
                }, () => {
                    console.log('nope');
                }).catch(() => {
                    console.log('err');
                });
            }
        },
        ready(){
            this.getPaired();
            let device = localStorage.getItem('device');
            if(device) this.connect(device);
        }
    }
</script>