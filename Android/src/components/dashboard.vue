<template>
    <box gap="1em">
        <h3>GPS Signal <small>100/{{Math.round(location.accuracy)}}</small></h3>
        <p>{{location.longitude}}, {{location.latitude}}</p>
    </box>

    <box gap="1em">
        <h3>Heading <small>{{heading}}</small></h3>
    </box>

    <box gap="1em">
        <h3>Engine Load <small>{{load}}</small></h3>
    </box>

    <box gap="1em">
        <h3>Engine RPM <small>{{rpm}}</small></h3>
    </box>

    <box gap="1em">
        <h3>Coolant <small>{{coolant}}<sup>°C</sup></small></h3>
    </box>

    <box gap="1em">
        <h3>Speed <small>{{speed}}<sup>km/h</sup></small></h3>
    </box>
    <box gap="1em">
        <h3>Engine Status <small><span v-if="status">ON</span><span v-if="!status">OFF</span></small></h3>
    </box>
</template>

<script type="text/babel">
    import box from 'vux/dist/components/box/index';

    import { requestServiceRun } from '../vuex/car/actions';
    import { startHeading } from '../vuex/compass/actions';
    import { sendData } from '../vuex/server/actions';

    export default{
        data(){
            return {
                interval: null
            }
        },
        components:{
            box
        },
        vuex: {
            getters:{
                location: ({gps}) => gps.location.coords,
                load: ({car}) => car.engineLoad,
                rpm: ({car}) => car.rpm,
                speed: ({car}) => car.speed,
                coolant: ({car}) => car.coolant,
                status: ({car}) => car.status,
                heading: ({compass}) => compass.compass.trueHeading
            },
            actions: {
                requestServiceRun,
                startHeading,
                sendData
            }
        },
        watch:{
            status(val){
                this.stopServer();
                this.$socket.emit('status', val);
                if(val){
                    this.startServer(250);
                }else{
                    this.stopServer();
                }
            }
        },
        methods:{
            startServer(interval){
                var vm = this;
                this.interval = setInterval(() => {
                    vm.$socket.emit('data', vm.data);
                }, interval);
            },
            stopServer(){
                clearInterval(this.interval);
            }
        },
        ready(){
            this.requestServiceRun();
            this.startHeading();

        },
        computed:{
            data(){
                return [
                    [
                        this.location.longitude,
                        this.location.latitude,
                        Math.round(this.heading)
                    ],
                    [
                        this.load,
                        this.rpm,
                        this.speed,
                        this.coolant
                    ]
                ]
            }
        }
    }
</script>


<style lang="sass">
    h3{
        small{
            display: block;
        }
    }
</style>